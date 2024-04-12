export let winningPos = [];
export let boardArr = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

export var players = [
    {
        name: '',
        score: 0,
    },
    {
        name: '',
        score: 0,
    }
];

export function reset()
{   
    winningPos = [];
    boardArr = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    for (let i = 0; i < 9; ++i) document.getElementById('grid' + i).innerHTML = '';
}

export function getArr(num)
{
    let nums = [];
    for (let i = 0; i < num; i++)
    {
        nums.push(i);
    }
    return nums;
}