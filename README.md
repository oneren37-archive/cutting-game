**![](https://lh6.googleusercontent.com/oLLIwzsViyQrEDabZX3DN3mjDRqQx_M7-UrbqHFNEAzqrZO53ecsbcEo5OshqbaDVT74mJ1HvjBzk3ZW6_2PMz16rsTWsKP3zt1D9dvNWDo3uQinGP8j6EQur8PoN-hd36R-xXIDmUR-KSOJ4j-hK8UzHJEFy-r7yDG8ByEmFbnB2HUTQSnNrnksWJbx3A)**

# Как посмотреть

по ссылке - https://oneren37.github.io/cutting-game/
или запустить локально

```
git clone https://github.com/oneren37/cutting-game.git
cd ./cutting-game
npm ci
npm start
```

# Что надо было сделать
## В чем смысл игры

дана фигура, нужно ее разрезать прямолинейными разрезами на n частей за определенное время, при этом постараться разрезать на равные части

## Также нужно реализовать
- миниавторизацию
- сохранение результатов игры в LocalStorage
- несколько уровней

## Технические требования
работа на desktop в современных браузерах

# Реализация

проект условно можно поделить на интерфейс и отрисовку игрового поля 

в интерфейсе использовались 
- react
- react-router-dom
- bootstrap

Игровое поле отрисовывается на canvas с помощью библиотеки p5

## Cтруктура проекта

**src 
│   App.js  
│   index.js  
│  
├───somePage  
│       SomePage.css  
│       SomePage.js  
│  
├───game  
│   │   Game.css  
│   │   Game.js  
│   │  
│   └───core  
│       │   ...  
│  ...
└───utils


## Хранение состояния

в приложении не так много данных, нужно хранить только текущего пользователя и результаты всех пользователей, поэтому state менеджеры не использовались и состояние хранится в local storage (по заданию)

## Как работает само разрезание фигуры на части и подсчет результата

Фигура - набор точек в декартовой системе координат и отрезки между ними. Используем в проекте только выпуклые многоугольники, в качестве начальной фигуры. 

Выпуклый многоугольник можно разрезать прямой только на 2 части, при этом эти части представляют собой выпуклые многоугольники. 

Итак, сперва пользователю выдается 1 исходная фигура, после разреза мы получаем 2 части и представляем их как отдельные фигуры, которые могут быть разрезаны в дальнейшем

Площадь каждой из фигур можно вычислить по формуле Гаусса.

Пользователю начисляются очки, которые считаются как отношение самой маленькой части фигуры к самой большой