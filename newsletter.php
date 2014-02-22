<?php
if ($_POST) {
    $email = $_POST['email'];
        
    $info_mail = "info@makoojewels.com";	
    $newsletter_mail = "newsletter@makoojewels.com";

    $full_name = 'Makoo Jewels';
    $makoo = $full_name.'<'.$info_mail.'>';


    //send email to makoo
    $headers = "" .
               "Reply-To:" . $email . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    $headers .= 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";    
    $headers .= 'From: ' . $email . "\r\n";
        
    $subject = "New Newsletter Signup";
    $message = '
            <p>Hooray!!!!!<p/>
            <p>' . $email . ' just signed to Makoo\'s newsletter!</p>
    ';
    
    mail($newsletter_mail,$subject,$message,$headers);
    
    
    //send email to the user
    $headers = "" .
               "Reply-To:" . $makoo . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    $headers .= 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";    
    $headers .= 'From: ' . $makoo . "\r\n";

    $subject = "Welcome to Makoo";
    $message = "";
    $message = '
            <p>Hello,</p>
            <p>thank you for subscribing to Makoo\'s newsletter!</p>
            <p>You can try our demo here: <a href="http://www.makoojewels.com/demo/">http://www.makoojewels.com/demo/</a></p>
            <p>The latest version of our demo works fine on Windows and Apple operative system</p>
			<p>Please email to <a href="mailto:info@makoojewels.com">info@makoojewels.com</a> or send us a message on <a href="https://www.facebook.com/makoojewels">Facebook</a> or <a href="https://twitter.com/Makoo_jewels">Twitter</a> to give us a feedback, ask questions or just support us! :)</p>
            <p>Best regards,</p>
            <p>The Makoo Team<br/><a href="http://www.makoojewels.com/">www.makoojewels.com</a></p>
    ';
    
    mail($email,$subject,$message,$headers);   
    
    // redirect to the demo
//    header("Location: demo.html");
//    die();
}

?>