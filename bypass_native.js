Java.perform(function() {
    console.log('[*] Tentative de bypass du code natif via Java...');

    try {
        // RootBeer utilise cette classe pour ses checks natifs
        var RootBeerNative = Java.use('com.scottyab.rootbeer.RootBeerNative');
        
        // On force la méthode native à renvoyer 0 (pas de root)
        RootBeerNative.checkForRoot.implementation = function() {
            console.log('[+] Appel natif checkForRoot intercepté -> Retourne 0 (Success)');
            return 0; 
        };

        console.log('[+] Bypass Natif Java-side installé avec succès !');
    } catch (e) {
        console.log('[-] Erreur : La classe RootBeerNative n\'a pas été trouvée.');
    }
});
