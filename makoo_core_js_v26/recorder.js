(function(window){

    var WORKER_PATH = 'recorderWorker.js';

    var Recorder = function(source, cfg){
        var config = cfg || {};
        config.bufferLen = 1024;
        var bufferLen = config.bufferLen || 4096;  //???
        this.context = source.context;
        this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
        var worker = new Worker(config.workerPath || WORKER_PATH);
        worker.postMessage({
            command: 'init',
            config: {
                sampleRate: this.context.sampleRate
            }
        });
        var recording = false,
            currCallback;

        //TODO method to fill in an array of averaged values!!!!!!!!!!!!!!!
        var buffersAll44k = [];
        var buffersAllLowres = [];
        var buffersAllMidres = [];
        var buffersRecorded44k = [];
        var buffersRecordedLowres = [];
        var buffersRecordedMidres = [];
        var buffersMidLowres = [];
        var lastMonoBuffer = [];
        var lastMonoSum = 0;
        var counter=0;
        this.node.onaudioprocess = function(e){
            counter++;

            var bufferLeft = e.inputBuffer.getChannelData(0);
            var bufferRight = e.inputBuffer.getChannelData(1);
            var bufferSum = [];
            lastMonoSum = 0;
            var lastMidBufferSum = 0;
            for(var i=0; i<bufferRight.length; i++){
                bufferSum[i] = 0;
                bufferSum[i] = bufferLeft[i] + bufferRight[i];
                //buffersAll44k.push( bufferSum[i] );
                lastMidBufferSum += Math.abs( bufferSum[i] );
                if( i%256==0 ){
                    //clog(lastMidBufferSum);
                    if(recording) buffersRecordedMidres.push(lastMidBufferSum);
                    lastMidBufferSum=0;
                }
                lastMonoSum += Math.abs( bufferLeft[i] )  +  Math.abs( bufferRight[i] );
            }
            //clog(lastMonoSum);
            lastMonoBuffer = bufferSum;
            //buffersAllLowres.push( lastMonoSum );
            rippleStartBuffer += Math.pow( lastMonoSum, 3) * normalizerMult;
            //clog(normalizerMult*lastMonoSum);

            if(recording){
                //INSERT LAST BUFFER IN THE RECORDING ARRAY
                buffersRecordedLowres.push( lastMonoSum );
                worker.postMessage({
                    command: 'record',
                    buffer: [
                        e.inputBuffer.getChannelData(0),
                        e.inputBuffer.getChannelData(1)
                    ]
                });
            }
        }

        this.getLastMonoSum = function(){
            return lastMonoSum;
        }

        this.getLastMonoBuffer = function(){
            return lastMonoBuffer;
        }

        this.getBuffersAllLowres = function(){
            return buffersAllLowres;
        }

        this.getBuffersRecLowres = function(){
            return buffersRecordedLowres;
        }

        this.getBuffersRecMidres = function(){
            return buffersRecordedMidres;
        }

        this.initBufferMidres = function(initLength){
            buffersRecordedMidres = new Array();
            for(var i; i<initLength; i++){
                buffersRecordedMidres[i] = 50;
            }
        }

        this.configure = function(cfg){
            for (var prop in cfg){
                if (cfg.hasOwnProperty(prop)){
                    config[prop] = cfg[prop];
                }
            }
        }

        this.record = function(){
            recording = true;
        }

        this.stop = function(){
            recording = false;
        }

        this.clear = function(){
            worker.postMessage({ command: 'clear' });
            buffersRecordedLowres = new Array(0);
            buffersRecordedMidres = new Array(0);
            bufferSum = new Array(0);
        }

        this.getBuffer = function(cb) {
            currCallback = cb || config.callback;
            worker.postMessage({ command: 'getBuffer' })
        }

        this.exportWAV = function(cb, type){
            currCallback = cb || config.callback;
            type = type || config.type || 'audio/wav';
            if (!currCallback) throw new Error('Callback not set');
            worker.postMessage({
                command: 'exportWAV',
                type: type
            });
        }

        worker.onmessage = function(e){
            var blob = e.data;
            currCallback(blob);
        }

        source.connect(this.node);
        this.node.connect(this.context.destination);    //this should not be necessary
    };

    Recorder.forceDownload = function(blob, filename){
        var url = (window.URL || window.webkitURL).createObjectURL(blob);
        var link = window.document.createElement('a');
        link.href = url;
        link.download = filename || 'output.wav';
        var click = document.createEvent("Event");
        click.initEvent("click", true, true);
        link.dispatchEvent(click);
    }

    window.Recorder = Recorder;

})(window);
