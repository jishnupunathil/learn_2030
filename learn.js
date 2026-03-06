function x() {
    for(var i=1;i<=5;i++){
        function y(x){
        setTimeout(function(){

        console.log(x)
    
    },i*1000)
}
y(i)
        }
    }

    x()
