var dataArray;

$.ajax({
    type: 'GET',
    url: '/data/b2bfacs.json',
    dataType: 'json',
    success: function(result) { 
        dataArray = result; //json output 
        for(var counter = 0; counter < 200; counter++) {
            dataArray[counter].Seed = Math.random();
        }
        dataArray.sort(function (a,b) {
            return a.Seed == b.Seed ? 0 : a.Seed > b.Seed ? 1 : -1;
        });
    },
    async: false
});

var currentIndex = 0;

var app = new Vue({
    el: '#app',
    data: {
        currentCard: dataArray[currentIndex]
    },
    methods: {
        nextCard: function (event) {
            currentIndex += 1;
            this.currentCard = dataArray[currentIndex];
        },
        previousCard: function (event) {
            currentIndex -= 1;
            this.currentCard = dataArray[currentIndex];
        },
        shuffle: function (event) {
            for(var counter = 0; counter < 200; counter++) {
                dataArray[counter].Seed = Math.random();
            }
            dataArray.sort(function (a,b) {
                return a.Seed == b.Seed ? 0 : a.Seed > b.Seed ? 1 : -1;
            });
            currentIndex = 0;
            this.currentCard = dataArray[currentIndex];
        },
        cardCounter: function() {
            return 199 - currentIndex;
        },
        disablePrevious: function(){
            return currentIndex <= 0;
        },
        disableNext: function(){
            return currentIndex >= 199;
        }
    }
})