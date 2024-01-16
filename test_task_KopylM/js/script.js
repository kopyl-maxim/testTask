document.addEventListener("DOMContentLoaded", function () {
    const categoryItems = document.querySelectorAll('.categories__item');
    const customCursor = document.querySelector('.cursor');
    let cursorTween;

    showCursor = () => {
        customCursor.style.display = 'block';
    }

    hideCursor = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        cursorTween = gsap.to(".cursor", {
            x: (rect.left + rect.right) / 2,
            y: (rect.top + rect.bottom) / 2,
            duration: 0.3,
            ease: "power5",
            onComplete: function () {
                gsap.set(".cursor", {x: 0, y: 0});
                customCursor.style.display = 'none';
            }
        });
    }

    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (cursorTween) {
                cursorTween.kill();
            }
            showCursor();

            // Добавляем обработчик события mousemove только когда находимся внутри .test
            window.addEventListener("mousemove", moveHandler);
        });

        item.addEventListener('mouseleave',  (e) => {
            hideCursor(e);

            // Удаляем обработчик события mousemove при покидании .test
            window.removeEventListener("mousemove", moveHandler);
        });
    });

    gsap.set(".cursor", {xPercent: -50, yPercent: -50});

    let xTo = gsap.quickTo(".cursor", "x", {duration: 0.6, ease: "power5"});
    let yTo = gsap.quickTo(".cursor", "y", {duration: 0.6, ease: "power5"});

    moveHandler = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
    }
});

openModal = () => {
    document.querySelector('.modal__popup').style.display = 'flex';
}

closeModal = () => {
    document.querySelector('.modal__popup').style.display = 'none';
}

document.getElementById('showPopupBtn').addEventListener('click',  () => {
    // Викликати аякс-запит тут
    makeAjaxRequest();
});


const requestUrl = 'https://jsonplaceholder.typicode.com/users';

makeAjaxRequest = () => {
    $.ajax({
        url: requestUrl,         /* Куда отправить запрос */
        method: 'get',             /* Метод запроса (post или get) */
        dataType: 'html',          /* Тип данных в ответе (xml, json, script, html). *//* Данные передаваемые в массиве */
        success: function (response) {
            displayPopup(response);
        },
    });
}