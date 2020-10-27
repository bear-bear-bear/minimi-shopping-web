// category - t-shirt, pants, skirt
// gender - man, female
// size - small, big
// material - smooth, tough
// color - blue, yellow, pink

// 1. options 안에서 랜덤으로 각 옵션을 하나씩 뽑아서 
// 2. Clothes 에 각 옵션을 인자로 부여해서
// 3. 랜덤 데이터 생성

const options = {
    category: ["t-shirt", "pants", "skirt"],
    gender: ["man", "female"],
    size: ["small", "big"],
    material: ["smooth", "tough"],
    color: ["blue", "yellow", "pink"],

    // 각 배열 길이에 맞춰 랜덤 값을 출력하는 함수
    
}

class Clothes {
    constructor(category, gender, size, material, color){
        this.category = category;
        this.gender = gender;
        this.size = size;
        this.material = material;
        this.color = color;
    }

    log () {
        console.log(this.color);
    }
}

const clothes = new Clothes("t-shirt", "man", "big", "tough", "red");

clothes.log();
