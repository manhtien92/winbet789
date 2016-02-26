<h3 style="text-align: center;background-color: #d24a1f;color: #fff;font-size: 25px;padding: 5px;border-radius: 2px;">Hi, <?php echo $data['name'] ?></h3>

<p>Please verify your email address so we know that it's really you!</p>

<a style="font-size: 16px;color: #ffffff;text-decoration: none;background-color: #3572b0;border-top: 11px solid #3572b0;border-bottom: 11px solid #3572b0;border-left: 20px solid #3572b0;border-right: 20px solid #3572b0;border-radius: 2px;" href="<?php echo $data['base_url'] . 'register/verify/' . $data['confirmation_code']; ?>">Verify my email address</a>
<p>Cheers,</p>
<p>Hokibet</p>