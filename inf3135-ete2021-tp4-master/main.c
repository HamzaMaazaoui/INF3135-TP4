#include "listeChainee.h"
#include "statistiques.h"

int main(int argc, char* argv[]) {

   validerArguments(argc, argv);

   node* liste = listeMots(argv[1]);

   trierMots(&liste);

   node* nouvelleListe = listeMotsTriees(liste);

   afficherListeChainee(nouvelleListe);

   if (argc > 2) {
      traitementFichierStats(argv[1], argv[3], nouvelleListe);
   }
}
