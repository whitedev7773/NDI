import Launchpad from "./launchpad.js";


var launchpad = new Launchpad();

// 메뉴 선택으로 체인 변경시 textarea 값 변경 & 런치패드 체인 번호 업데이트
toggle_pad.addEventListener("click", launchpad.ToggleShowing);
chain_select.addEventListener("change", (e) => {
    var c_number = chain_select.value.replace("c", "");
    launchpad.SelectChain(c_number);
    LoadDataFromChain(c_number);
});

// 체인 클릭시 해당 체인으로 실시간 변경
document.querySelectorAll(".chain").forEach((chain) => {
    // 맨 윗줄 체인은 제외
    if (chain.id.length >= 2) {
        chain.addEventListener("click", (e) => {
            var c_number = chain.id.replace("c", "");

            // 런치패드 체인 변경
            launchpad.SelectChain(c_number);

            // 체인 선택란의 선택값을 클릭한 체인으로 변경
            var chain_select_box = document.querySelector("#chain_select");
            chain_select_box.value = chain.id;
            LoadDataFromChain(c_number);
        })
    };
});

// 버튼 클릭 시 해당 버튼 삭제 예정란 추가
document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", (e) => {
        var y = button.id.charAt(1);
        var x = button.id.charAt(2);
        var input = document.querySelector("#delete_button");
        var input_split = input.value.split("\n");
        if (input_split.includes(`${y} ${x}`)) {
            input.value = input_split.filter((e) => e !== `${y} ${x}`).join("\n");
        }
        else {
            input.value += `${y} ${x}\n`;
        }
    })
});


// 삭제할 버튼 데이터
var data = {
    "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [],
    "9": [], "10": [], "11": [], "12": [], "13": [], "14": [], "15": [], "16": [],
    "17": [], "18": [], "19": [], "20": [], "21": [], "22": [], "23": [], "24": [],
};
/**
 * 입력란을 특정 체인에서 삭제할 버튼들의 리스트로 업데이트합니다
 * @param {string} chain 
 */
function LoadDataFromChain(chain) {
    var input = document.querySelector("#delete_button");
    input.value = data[chain].join("\n");
}

/**
 * 해당 체인에 저장된 데이터의 버튼을 모두 선택하여 칠함
 * @param {string} chain 
 */
function ColorButtonFromChainData(chain) {
    data[chain].forEach((yx) => {
        launchpad.ButtonColor(yx.charAt(0), yx.charAt(2));
    });
}

// 0.1초마다 특정 체인에서 삭제할 버튼 데이터 저장
var Update = setInterval(function() {
    launchpad.ClearColoredButtons();
    
    var input = document.querySelector("#delete_button");
    var chain = document.querySelector("#chain_select").value.replace("c", "");
    var input_split = input.value.split("\n");
    
    for (var i=0; i<input_split.length; i++) {
        input_split[i] = input_split[i].trim();
    }
    data[chain] = input_split;
    
    
    // 저장과 동시에 삭제될 버튼 표시
    input_split.forEach((yx) => {
        // 아무 것도 없는 줄이면 pass
        yx = yx.replaceAll(" ", "");
        var y = yx.charAt(0);
        var x = yx.charAt(1);
        
        if (y == "" || x == "" || yx == "" || yx == null) {return};
        
        if (!isNaN(y) && !isNaN(x)) {
            var bt = document.querySelector(`#b${y}${x}`)
            if (!(bt.classList.contains("selected-button"))) {
                launchpad.ButtonColor(y, x);
            }
        }
    });
    input_line_count.innerText = `${document.querySelector("#input").value.split("\n").length} Lines`;
    output_line_count.innerText = `${output.value.split("\n").length} Lines`;
}, 100);

// 변환 시작 버튼 클릭시
start.addEventListener("click", (e) => {
    // OUTPUT 초기화
    output.value = "";

    var chain_mode = "1";
    
    var chain_command = ["c", "chain"];
    var touch_command = [
        "t", "touch",
        "o", "on",
        "f", "off"
    ];

    var input_split = input.value.split("\n");
    for (var i=0; i < input_split.length; i++) {
        var line = input_split[i].trim();  // 앞 뒤 공백 제거
        var line_split = line.split(" ");

        // 공백이면 건드리지 말고 추가
        if (line == "") {
            output.value += "\n";
            continue;
        }

        var command = line_split[0];

        // console.log(command, chain_command.includes(command), touch_command.includes(command));
        
        // 체인 명령어라면
        if (chain_command.includes(command)) {
            // console.log("체인 변경");
            chain_mode = line_split[1];
        }
        // 터치 명령어라면
        else if (touch_command.includes(command)) {
            // console.log("터치 커맨드");
            var y = line_split[1];
            var x = line_split[2];
            // 제외할 버튼이라면 다음 라인으로 이동
            if (data[chain_mode].includes(`${y} ${x}`)) {
                console.log(`Line ${i} OUTPUT PASSED [${line}]`);
                continue;
            }
        }

        // 모든 제외 조건에 불일치하면 OUTPUT에 라인 추가
        output.value += line + "\n";
    }
});
