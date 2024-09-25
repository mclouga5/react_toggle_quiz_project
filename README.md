# A React Toggle Quiz by Aoife McLoughlin
If you haven't got npm please install it by running:
```npm install ```

## Limitations

No ability to navigate between different quizzes. Only the predefined and limited data for a singular quiz can be used at the moment. Future versions could see a range of different quiz data structures by using a createContext hook and managing global state related to a quiz.

CSS optimised for three options per answer. More work required to make toggle-buttons more adaptive to any number of options. Future work could also include the use of Tailwind CSS instead.

## Assumptions

Only one question shown on the page at a time.

All questions are plain strings.

All toggle answer options are strings.

No navigation beyond the question and answer component required.

## Other comments

Not an assumption but I felt that toggle movements all being implemented in a uniform direction for a specific viewport was more user friendly. 
Hence the design choice not to recreate styles such as that in Figma Group 48096222. 

Apologies for my lack of commit history, I do usually put specific care into them; but seeing as it was my first time programming with TypeScript, this project took a few twists and turns!
