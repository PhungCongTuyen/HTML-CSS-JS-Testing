function mapData(data) {
    document.getElementById('main__content').innerHTML = data.map((item) => `
    <div class="main__content__item text--light">
        <div>
            <img class="main__content__item__image ${item.image === 'images/hob3.png' && "main__content__item__rotate"}" src="${item.image}"/>
            <h2 class="main__content__item__title">${item.title}</h2>
            <h4 class="font__common main__content__item__description">${item.description}</h4>
            ${item.characters.map((char) => `<div class="main__content__item__character">${char}</div>`).join('')}
        </div>
        <div>
            <button class="button--yellow text--light main__content__item__button">View Product</button>
            <h2>${item.price}</h2>
        </div>
    </div>
`).join('')
}

(function getMockData() {
    fetch('/data.json').then((r) => r.json()).then((data) => {
        mapData(data)
    })
})();

function debounceValue(func, timeout = 3000) {
    let timer
    return (...arg) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, arg)
        }, timeout)
    }

}

function displayData(value) {
    fetch('/data.json').then((r) => r.json()).then((data) => {
        if (!value) return mapData(data)
        const filteredData = []
        for (let i = 0; i < data.length; i++) {
            let flag = false
            for(key in data[i]) {
                if (String(data[i][key]).toLowerCase().trim().includes(value.toLowerCase())) {
                    flag = true
                }
            }
            if (flag) {
                filteredData.push(data[i])
            }
        } 
        return mapData(filteredData)
    })
}

const onChange = debounceValue((value) => displayData(value), 1000)