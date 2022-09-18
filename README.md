# mokepon-project
Mokepon project for platzi basic programming course

Instructions:

1- Select a pet
2- Click on "Select" button
3- Two form of battle:
  - Battle random enemy local:
    4- Click on "Random Enemy" button
    5- Move over it
    6- Click on "Battle [Pet]" button
    7- Confirm battle
  - Battle enemy online:
    4- Click on "Connect Online"
    5- Move over a enemy
    6- Click on "Battle [Pet]" button
    7- Confirm battle and wait respond
      Note: If enemy accept you enter to battle else you can resend battle or  choose antoher enemy
8- Select your attack sequence by clicking on the attack buttons
9- Wait for the enemy to select their attack sequence
  Note: If enemy is random automatically generate a random sequence
10- Repeat steps 8 and 9 until there is a winner

Battle Rules

- Every turn you select a attack sequence of 5
- That sequence is compared to the enemy's and a win, lose, or tie state is declared
- The result depends on the following conditions according with type attack:
  * Water defeat Fire
  * Fire defeat Plant
  * Plant defeat Water
  * Normal ties with any type
- Damage attack increment if attack type is equal to mokepon type ally
- Damage attack decrement if attack type is weak to mokepon type enemy
- If tied battle both receive a little percent of damage
