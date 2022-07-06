const imageList = document.querySelector('.image-list');
const btns = document.querySelectorAll('.view-options button');
const imageListItems = document.querySelectorAll('.image-list li');
const active = 'active';
const listView = 'list-view';
const gridView = 'grid-view';
const dNone = 'd-none';

//버튼 활성화
for(const btn of btns){ //배열명 btns 하나하나 각각의 요소를 btn이라는 요소로 설정한다
    btn.addEventListener('click',function(){
        const parent = this.parentElement;
        document.querySelector('.view-options .active').classList.remove(active);
        parent.classList.add(active);

        if(parent.classList.contains('show-list')){
            parent.previousElementSibling.previousElementSibling.classList.add(dNone);
            imageList.classList.remove(gridView);
            imageList.classList.add(listView);

        }else{
            parent.previousElementSibling.classList.add(dNone);
            imageList.classList.remove(listView);
            imageList.classList.add(gridView);
        }

    });
}

// 리스트 너비 조절 Range 스크립트
const rangeInput = document.querySelector('input[type="range"]');

rangeInput.addEventListener('input', function(){
    //this.value
    document.documentElement.style.setProperty('--minRangeValue', `${this.value}px`);
                                                                    //this.value + 'px'랑 같다
    //선택자.style.backgroundColor = 'blue';
    //선택자.style.setProperty('background-color', 'blue');
});

//검색키워드로 필터 적용
const captions = document.querySelectorAll('.image-list figcaption p:first-child');
const myArray = [];
let counter = 1;

for(const caption of captions){
    myArray.push({
        id:counter++,
        text:caption.textContent
    });
}
console.log(myArray);

const searchInput = document.querySelector('input[type="search"]');
const photosCounter = document.querySelector('.toolbar .counter span');

searchInput.addEventListener('keyup', keyupHandler);
//keyup : 키보드 눌르고 때는 순간
//keydown : 사용자가 키보드 눌렀을 떄 한번만 작동
//keypress : 사용자가 키보드 눌렀을 떄 계속 작동

function keyupHandler(){
    for(const item of imageListItems){
        item.classList.add(dNone);
    }
    const keywords = this.value;

    const filteredArray = myArray.filter(el => el.text.toLowerCase().includes(keywords.toLowerCase()));
    console.log(filteredArray);

    if(filteredArray.length > 0){
        for(const el of filteredArray ){
            //.image-list li:nth-child(2)
            //.image-list li:nth-child(el.id)
            document.querySelector(`.image-list li:nth-child(${el.id})`).classList.remove(dNone);
        }
    }
    photosCounter.textContent = filteredArray.length;
}

//filter 
// var arr = {3,15,9,20,25};
// var arr2 = arr.filter(function(n){  
//     return n % 5 == 0;  // 5로 나눴을 떄 나머지가 0인 값들만 다시 arr2 배열에 새로 넣겠다
// });
// console.log(arr2);

// var arr = [3,15,9,20,25];
// var arr2 = arr.filter(n=>{    return n % 5 == 0; });
// console.log(arr2);

// var arr = [3,15,9,20,25];
// var arr2 = arr.filter(n=>n % 5 == 0);
// console.log(arr2);