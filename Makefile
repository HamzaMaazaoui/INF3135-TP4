tri: main.o
	gcc -o tri main.o

main.o : main.c
	gcc -c -Wall main.c -std=c11

