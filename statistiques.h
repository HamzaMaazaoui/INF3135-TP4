#include<stdio.h>
#include<stdlib.h>
#include<string.h>

#define MOTS_NON_REPETES "nombre de mots non répétés"
#define MOTS_REPETES "nombre de mots répétés"
#define NBRE_LIGNES "nombre de lignes"
#define NBRE_LETTRES "nombre de lettres"
#define LETTRE_PLUS_FREQUENTE "la lettre la plus fréquente"

struct statistique {
    int mots_non_repetes_int;
    int mots_repetes_int;
    int nbre_lignes_int;
    int nbre_lettres_int;
    char lettre_plus_frequente_c;
};

typedef struct statistique statistique;



/**
  compter le nombre des mots repetees et non repetees.
  @param liste: liste chainee des mots
  @param stats: structure statistiques
 */
void compterMotsRepetees(node *liste, statistique *stats);

/**
  compter le nombre des lettres.
  @param listeTriee: liste chainee des mots triees
  @param stats: structure statistiques
 */
void compterNbreLettres(node *listeTriee, statistique *stats);

/**
  compter le nombre des lignes dans le fichier source.
  @param nomFichier: le fichier a traiter
  @param stats: structure statistiques
 */
void compterNbreLignes(const char* nomFichier, statistique* stats);

/**
  calculer les statistiques dans un fichier.
  @param nomFichier: le fichier a traiter
  @param fichierStats: le fichier pour stocker les statistiques
  @param listeTriee: liste des mots triees 
 */
void traitementFichierStats(const char* nomFichier, const char* fichierStats, node* listeTriee);



void compterMotsRepetees(node *liste, statistique *stats) {
   char** mots = listeEnMots(liste);
   int longMots = longListe(liste);
   int mask[longMots];
   memset(mask, 0, longMots * sizeof(int));
   for (int i = 0; i < longMots; i++) {
      if (mask[i] == 0) {
         mask[i] = 1;
         int cpt = 0;
         for (int j = 0; j < longMots; j++) {
            if (mask[j] == 0 && strcmp(mots[i], mots[j]) == 0) {
               cpt++;
               mask[j] = 1;
            }
         }
         if (cpt > 0) {
            (stats->mots_repetes_int)++;
         } else {
            (stats->mots_non_repetes_int)++;
         }
      }
   }
}

void compterNbreLettres(node *listeTriee, statistique *stats) {
   int lettres[26] = {0};
   while (listeTriee != NULL) {
      for (int i = 0; i < (int)strlen(listeTriee->donnee); i++) {
         ++lettres[(int)(listeTriee->donnee)[i] - 65];
      }
      listeTriee = listeTriee->suivant;
   }

   int cptLettres = 0, max = 0;
   char lettre_plus_frequente_c = '\0';
   for (int i = 0; i < 26; ++i) {
      cptLettres += lettres[i];
      if (max < lettres[i]) {
         max = lettres[i];
         lettre_plus_frequente_c = (char)(i + 65);
      }
   }
   stats->nbre_lettres_int = cptLettres;
   stats->lettre_plus_frequente_c = lettre_plus_frequente_c;
}

void compterNbreLignes(const char* nomFichier, statistique* stats) {
   int longBuffer = 255;
   char ligne[longBuffer];
   FILE* fichier = fopen(nomFichier, "r");
   if (fichier == NULL) {
      printf("Le fichier : %s n'existe pas\n", nomFichier);
      exit(-1);
   }

   while (fgets(ligne, longBuffer, fichier)) {
      (stats->nbre_lignes_int)++;
   }

   fclose(fichier);

}


void traitementFichierStats(const char* nomFichier, const char* fichierStats, node* listeTriee) {
   node* liste = listeMots(nomFichier);
   statistique stats = {0, 0, 0, 0, '\0'};

   compterNbreLignes(nomFichier, &stats);

   compterMotsRepetees(liste, &stats);

   compterNbreLettres(listeTriee, &stats);

   FILE* fichier_Stats = fopen("statistiques.txt", "w");
   fprintf(fichier_Stats, "%s : %d\n", MOTS_NON_REPETES, stats.mots_non_repetes_int);
   fprintf(fichier_Stats, "%s : %d\n", MOTS_REPETES, stats.mots_repetes_int);
   fprintf(fichier_Stats, "%s : %d\n", NBRE_LIGNES, stats.nbre_lignes_int);
   fprintf(fichier_Stats, "%s : %d\n", NBRE_LETTRES, stats.nbre_lettres_int);
   fprintf(fichier_Stats, "%s : %c\n", LETTRE_PLUS_FREQUENTE, stats.lettre_plus_frequente_c);
   fclose(fichier_Stats);
}





