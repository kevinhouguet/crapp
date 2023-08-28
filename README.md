# Application

CRA = Compte rendu d'activité

problème résolu :
https://stackoverflow.com/questions/60081729/symfony4-problem-with-knpsnappy-wkhtmltopdf
https://stackoverflow.com/questions/62315246/wkhtmltopdf-0-12-6-warning-blocked-access-to-file

# Issues

Installation of composer require twig/intl-extra for date formating

All you need to do is clearing the comment (;) before this line in php.ini file: Windows: ;extension=php_intl.dll to extension=php_intl.dll
Fatal error: Class 'IntlDateFormatter' not found - Stack Overflow
https://stackoverflow.com/questions/6242378/fatal-error-class-intldateformatter-not-found#:~:text=All%20you%20need%20to%20do%20is%20clearing%20the,line%20in%20php.ini%20file%3A%20Windows%3A%20%3Bextension%3Dphp_intl.dll%20to%20extension%3Dphp_intl.dll