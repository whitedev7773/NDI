export default class Launchpad {
    chain = "1";
    is_showing = true;

    colored_buttons = [];  // ["xy1", "xy2", ...]

    constructor (){
        console.log("Virtual Launchpad Loaded");
    }


    /**
     * 버튼을 검정색으로 칠합니다
     * @param {string} y 세로 번째수
     * @param {string} x 가로 번째수
     * */
    ButtonColor(y, x) {
        var bt = document.querySelector(`#b${y}${x}`);
        bt.classList.add("selected-button");
        // console.log(`Button [${y} ${x}] Colored`);
    }
    
    /**
     * 버튼 색을 원래대로 되돌립니다
     * @param {string} y 세로 번째수
     * @param {string} x 가로 번째수
     * */
    ButtonDecolor(y, x) {
        var bt = document.querySelector(`#b${y}${x}`);
        bt.classList.remove("selected-button");
        // console.log(`Button [${y} ${x}] Decolored`);
    }

    /**
     * 색칠된 모든 버튼을 원래대로 되돌립니다
     */
    ClearColoredButtons() {
        for (var y=1; y<=8; y++) {
            for (var x=1; x<=8; x++) {
                var bt = document.querySelector(`#b${y}${x}`);
                if (bt.classList.contains("selected-button")) {
                    this.ButtonDecolor(y.toString(), x.toString());
                }
            }
        }
        // console.log(`Clean`);
    }

    /**
     * 체인을 변경합니다
     * @param {string} c 체인
     */
    SelectChain(c) {
        this.chain = c

        var chains = document.querySelectorAll(".chain");
        chains.forEach((chain) => {
            if (chain.id == `c${this.chain}`) {
                chain.classList.add("selected-chain");
            }
            else {
                chain.classList.remove("selected-chain");
            }
        });

        console.log(`Chain ${c} Selected`);
    }

    /**
     * 가상 런치패드를 껏다 킵니다
     */
    ToggleShowing() {
        var pad = document.querySelector("#launchpad");
        if (this.is_showing) {
            pad.classList.remove("launchpad-disabled");
            console.log("런치패드 Show");
        }
        else {
            pad.classList.add("launchpad-disabled");
            console.log("런치패드 Hide");
        }
        this.is_showing = !this.is_showing;
    }
}
