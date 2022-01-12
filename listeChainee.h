#include<stdio.h>
#include<stdlib.h>
#include<string.h>

struct node {
    char* donnee;
    struct node* suivant;
};

typedef struct node node;

/**
  valider les arguments.
  @param argc nombre d'elements
  @param argv[] contenu des elements 
 */
void validerArguments(int argc, char* argv[]);

/**
  initialiser liste chainee
  @param liste: la liste chainee
 
 */
void init(node** liste);

/**
  afficher la nouvelle liste des mots triees.
  @param liste: la liste chainee
 */
void afficherListeChainee(node* liste);

/**
  ajouter un element dans la liste chainee.
  @param liste: la liste chainee
  @param element: l'element a ajouter
 */
void ajouterElement(node** liste, const char* element);

/**
  calculer la longueur
  @param liste la liste chainee
  @return retourne la longueur de la liste
 */
int longListe(node* liste);

/**
  fonction qui permet de trier  2 mots.
  @param mot1 le premier mot a comparer 
  @param mot2 le deuxieme mot a comparer 
  @return 0 si sont pareils, >0 le 1er mot est plus grand que la deuxieme sinon <0
 */
int comparerMots(const void* mot1, const void* mot2);

/**
  creer la liste chainee a partir du fichier.
  @param nomFichier le nom du fichier 
  @return la liste chainee
 */
node* listeMots(const char* nomFichier);

/**
  creer la nouvelle liste chaine triees.
  @param liste la liste chainee non triees
  @return la nouvelle liste chainee
 */
node* listeMotsTriees(node* liste);

/**
  trier les mots selon le premier caractere.
  @param list la liste des mots a trier
 */
void trierMots(node** liste);

void validerArguments(int argc, char* argv[]) {
    if (argc > 2) {
      if (argc == 3) {
         printf("Veuillez saisir le nom de fichier de statistique!\n");
         exit(-1);
      }
      else if (strcmp(argv[2], "-S") != 0 && strcmp(argv[2], "-s") != 0) {
         printf("vous devez saisir -s ou -S!\n");
         exit(-1);
      }
   }
   else  if (argc < 2) {
      printf("Veuillez saisir le nom de fichier!\n");
      exit(-1);
   }
}

void init(node** liste) {
   *liste = NULL;
}

void afficherListeChainee(node* liste) {   
   while (liste != NULL) {
      printf("%s\n", liste->donnee);
      liste = liste->suivant;
   }
}

void ajouterElement(node** liste, const char* element) {
   node* nouvelElement = (node*) malloc(sizeof(struct node));
   nouvelElement->donnee = (char*) malloc(strlen(element) * sizeof(char));
   strcpy(nouvelElement->donnee, element);
   nouvelElement->suivant = NULL;
   node* listeTempo = *liste;
   node* dernier = listeTempo;
   while (listeTempo != NULL) {
      dernier = listeTempo;
      listeTempo = listeTempo->suivant;
   }
   if (*liste == NULL) {
      *liste = nouvelElement;
   } else {
      dernier->suivant = nouvelElement;
   }
}

char** listeEnMots(node* liste) {
   const int longueur = longListe(liste);
   char** tableau = (char**) malloc(longueur * sizeof(char*));
   int cpt = 0;
   while (liste != NULL) {
      tableau[cpt] = (char*) malloc(strlen(liste->donnee) * sizeof(char));
      strcpy(tableau[cpt], liste->donnee);
      liste = liste->suivant;
      cpt++;
   }
   return tableau;
}

int longListe(node* liste) {
   int cpt = 0;
   while (liste != NULL) {
      cpt++;
      liste = liste->suivant;
   }
   return cpt;
}

int comparerMots(const void* mot1, const void* mot2) {
   const char **ia = (const char **)mot1;
   const char **ib = (const char **)mot2;
   return strcmp(*ia, *ib);
}


node* listeMots(const char* nomFichier) {
   node* liste;
   init(&liste);
   FILE* fichier = fopen(nomFichier, "r");
   int longBuffer = 255;
   char ligne[longBuffer];

   if (fichier == NULL) {
      printf("Le fichier : %s n'existe pas\n", nomFichier);
      exit(-1);
   }
   while (fgets(ligne, longBuffer, fichier)) {
      if (strlen(ligne) > 0) {
         ligne[strlen(ligne) - 1] = '\0';
         char * strToken = strtok (ligne, " ");
         while (strToken != NULL) {
            ajouterElement(&liste, strToken);
            strToken = strtok (NULL, " ");
         }
      }
   }
   fclose(fichier);
   return liste;
}



node* listeMotsTriees(node* liste) {
   node* nouvelleListe;
   node* listeTempo = liste;
   char* dernierMot = "";
   init(&nouvelleListe);
   while (listeTempo != NULL) {
      if (nouvelleListe != NULL &&  strcmp(listeTempo->donnee, dernierMot) != 0) {
         ajouterElement(&nouvelleListe, listeTempo->donnee);
         dernierMot = listeTempo->donnee;
      } else if (nouvelleListe == NULL) {
         ajouterElement(&nouvelleListe, listeTempo->donnee);
         dernierMot = listeTempo->donnee;
      }
      listeTempo = listeTempo->suivant;
   }
   return nouvelleListe;
}


void trierMots(node** liste) {
   char** tableau = listeEnMots(*liste);
   int longueur = longListe(*liste);
   qsort(tableau, longueur, sizeof(char*), comparerMots);
   init(liste);
   for(int i = 0; i < longueur; ++i) {
      ajouterElement(liste, tableau[i]);
   }
}




