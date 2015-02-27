# DeezApp
Application mobile construite avec le framework Ionic, dans le cadre d'un TD.

<a href="https://raw.githubusercontent.com/jmpp/deezapp/194a652b27d177f9eaaf3d204480244031a1bd0d/_docs/search.png"><img src="https://raw.githubusercontent.com/jmpp/deezapp/194a652b27d177f9eaaf3d204480244031a1bd0d/_docs/search.png" alt="search" style="width: 200px;"></a>
<a href="https://raw.githubusercontent.com/jmpp/deezapp/194a652b27d177f9eaaf3d204480244031a1bd0d/_docs/list.png"><img src="https://raw.githubusercontent.com/jmpp/deezapp/194a652b27d177f9eaaf3d204480244031a1bd0d/_docs/list.png" alt="list" style="width: 200px;"></a>
<a href="https://raw.githubusercontent.com/jmpp/deezapp/194a652b27d177f9eaaf3d204480244031a1bd0d/_docs/detail.png"><img src="https://raw.githubusercontent.com/jmpp/deezapp/194a652b27d177f9eaaf3d204480244031a1bd0d/_docs/detail.png" alt="detail" style="width: 200px;"></a>

# Installation
Vous aurez besoin de :
* ionic
* cordova CLI ^4.2.0
* gulp

Installez les dépendances : `npm install`

# Lancer un serveur de dev
Lancez la commande : `ionic serve`

# Builder
Lancez la commande `ionic build <platform>` (nécessite les SDK adéquats installés sur votre environnement)

# Déployer
Sur un Android, activez le mode **debug USB** dans les options développeur et lancez la commande `ionic run android`

Sur un iPhone, installez l'application [Ionic View sur l'Apple Store](https://itunes.apple.com/us/app/ionic-view/id849930087?mt=8), et créez un compte. Puis, dans votre terminal, lancez la commande `ionic upload` pour déployer votre build sur l'application **Ionic View**.