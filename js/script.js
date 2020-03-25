



fetch('https://quiztai.herokuapp.com/api/quiz')
    .then(resp => resp.json())
    .then(resp => {
        preQuestions = resp;

        let next = document.querySelector('.next');
        let previous = document.querySelector('.previous');

        let question = document.querySelector('.question');
        let answers = document.querySelectorAll('.list-group-item');

        let pointsElem = document.querySelector('.score');
        let restart = document.querySelector('.restart');

        let index = 0;
        let points = 0;

        let finished_answers = [];

        function activateAnswers() {
            for (let i = 0; i < answers.length; i++) {
                answers[i].addEventListener('click', doAction);
            }
        }
        activateAnswers()

        function disableAnswers(){
            for (let i = 0; i < answers.length; i++) {
                answers[i].removeEventListener('click', doAction);
            }
        }

        function cleanQuestions(){
            for (let i = 0; i < answers.length; i++) {
                answers[i].classList.remove('correct');
                answers[i].classList.remove('incorrect')
            }
        }

        function setQuestion(index) {

            question.innerHTML = (index+1)+':'+preQuestions[index].question;

            answers[0].innerHTML = preQuestions[index].answers[0];
            answers[1].innerHTML = preQuestions[index].answers[1];
            answers[2].innerHTML = preQuestions[index].answers[2];
            answers[3].innerHTML = preQuestions[index].answers[3];
            if (preQuestions[index].answers.length === 2) {
                answers[2].style.display = 'none';
                answers[3].style.display = 'none';
            } else {
                answers[2].style.display = 'block';
                answers[3].style.display = 'block';

            }
        }

        setQuestion(0);

        next.addEventListener('click', function (event) {
            index++;
            if (index >= preQuestions.length) {
                document.querySelector('.list').style.display = 'none';
                document.querySelector('.results').style.display = 'block';
                document.querySelector('.userScorePoint').innerHTML = points;
                let previoussession = localStorage.getItem('playhistory');
                if(previoussession!=undefined){
                    prevjson = JSON.parse(previoussession);
                    let games_played = prevjson.games_played;
                    let scorehistory = prevjson.scorehistory;
                    document.querySelector('.average').innerHTML = scorehistory;
                    games_played++;
                    scorehistory = scorehistory + points;
                    scorehistory = scorehistory / games_played;
                    localStorage.setItem('playhistory',JSON.stringify({games_played: games_played,scorehistory: scorehistory}))
                }else{
                    document.querySelector('.average').innerHTML = points;
                    localStorage.setItem('playhistory',JSON.stringify({games_played: 1,scorehistory: points}))
                }
            } else {
                setQuestion(index);
                if(!finished_answers.includes(index)){
                    activateAnswers();
                }
                else{
                    disableAnswers();
                }
                cleanQuestions();
            }


        });


        previous.addEventListener('click', function (event) {
            if(index>0){
                index--;
                setQuestion(index);
                if(!finished_answers.includes(index)){
                    activateAnswers();
                }
                else{
                    disableAnswers();
                }
                cleanQuestions();
            }

        });

        function markCorrect(elem) {
            elem.classList.add('correct');
        }

        function markInCorrect(elem){
            elem.classList.add('incorrect');
        }

        function doAction(event) {
            if (event.target.innerHTML === preQuestions[index].correct_answer) {
                points++;
                pointsElem.innerText = points;
                markCorrect(event.target);
                disableAnswers()
            }
            else {
                markInCorrect(event.target);
                disableAnswers();
            }
            finished_answers.push(index);
        }





        restart.addEventListener('click', function (event) {
            event.preventDefault();
            index = 0;
            points = 0;
            finished_answers = [];
            document.querySelector('.results').style.display = 'none';
            document.querySelector('.list').style.display = 'block';
            pointsElem.innerText = points;
            setQuestion(0);
            cleanQuestions();
            activateAnswers();
        });


    });

