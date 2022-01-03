<?php

$fi = new FilesystemIterator(__DIR__ . '/img', FilesystemIterator::SKIP_DOTS);
$cnt = iterator_count($fi);

?>
<!doctype html>
<html lang="fr">
    <head>
        <title>Jean Casse-tête</title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Pouet pouet c'est rigolo le casse-tête de Jean Castex" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Jean Casse-tête" />
        <meta property="og:description" content="Pouet pouet c'est rigolo le casse-tête de Jean Castex" />
        <meta property="og:site_name" content="Jean Casse-tête" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://jean-casse-tete.fr/card.png" />
        <meta property="og:url" content="https://jean-casse-tete.fr/" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" type="image/png" href="favicon.png" />
        <link rel="stylesheet" href="bootstrap.min.css" media="screen" />
        <link rel="stylesheet" href="style.css" media="screen" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" media="screen" />
    </head>
    <body class="text-center">
        <h1 class="my-3">Jean Casse-tête 🤯</h1>
        <div class="mb-5">
            <img src="arrows.png" class="d-inline-block me-3" />
            <img src="chars.png" class="d-inline-block ms-3" />
        </div>
        <div class="game-container mx-auto mb-3">
            <div id="overlay"></div>
            <div id="game"></div>
        </div>
        <a href="./" class="btn btn-primary mb-4">Recommencer</a>
        <p class="mb-4">
            Partager :
            <a title="sur Twitter" href="https://twitter.com/intent/tweet?url=https://jean-casse-tete.fr" class="px-3"><i class="fab fa-twitter"></i></a><a title="sur Facebook" href="https://www.facebook.com/sharer/sharer.php?u=https://jean-casse-tete.fr" class="px-3"><i class="fab fa-facebook"></i></a>
        </p>
        <footer class="text-center mb-5">
            Fait par <a href="https://twitter.com/p_cauty">Peter Cauty</a> avec amour ❤️ <br />
            <a href="https://vitemadose.covidtracker.fr">Vaccinez-vous 💉</a> |
            <a href="https://github.com/phpitou/jean-casse-tete.fr"><i class="fab fa-github"></i>&nbsp;Code source</a><br />
            🚀&nbsp;Propulsé par <a href="https://pulseheberg.com">PulseHeberg</a>
        </footer>
        <script type="text/javascript">const images_count = <?= $cnt ?>;</script>
        <script src="confetti.browser.min.js"></script>
        <script type="text/javascript" src="script.js"></script>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HS9V5YQD5M"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HS9V5YQD5M');
        </script>
    </body>
</html>
