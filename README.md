# Final Project
In this project we were given a vulnerability from the OWASP top 10 list and asked to replicate it or show the concept of attack by
creating a simple CTF like challenge.

To show a concept of the attack we decided to create a simple website which uses the Pickle library in python to load and generate
authentication tokens. The Pickle library is known to be insecure against malicious user input. This means that the attacker can
construct his own token and perform a remote code execution attack.

![Frontpage](https://raw.githubusercontent.com/nielsing/TOOR_Insecure_Deserialization/master/frontpage.png)
