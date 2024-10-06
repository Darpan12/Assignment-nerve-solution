
const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];

 const strategyArray = [
    {
        'View': 'Bullish',
        'Value': {
        '24-Apr-2024': ['Bull Call Spread','Bull Put Spread','Bull Put Spread','Long Call','Bull PutSpread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy1','Strategy1',
            'Spread-tegy','Bull Call Spread'],
        '02-May-2024': ['Bull Call Spread','Bull Call Spread','Bull Put Spread','Long Call','LongCall','Long Call','Bull Put Spread','Bull Call Spread','Strategy1',
            'Bull CallSpread','Strategy2','Strategy1','Strategy2','Bull Call Spread'],
        '09-May-2024': ['Strategy Put','Strategy Call','Strategy Call','Strategy Call','Strategy Put'],
        }
    },
    {
        'View': 'Bearish',
        'Value': {
        '24-Apr-2024': ['Bear Call Spread','Bear Call Spread','Bear Call Spread','Long Put','LongPut','Long Put','Bear Call Spread',],
        '31-May-2024': ['Long Put','Long Put','Long Put','Long Put','Long Put'],
        '21-Jun-2024': ['Strategy3','Strategy3','Bear Put Spread','Strategy3','Long Put','LongPut'],
        }
    },
    {
        'View': 'RangeBound',
        'Value': {
        '24-Apr-2024': ['Short Straddle','Short Strangle','Short Strangle','Iron Butterfly','ShortStrangle','Short Straddle','Strategy1','Short Straddle','Strategy1','Strategy1',
        'Spread-Strategy','Short Straddle'],
        '02-May-2024': ['Short Straddle','Short Straddle','Short Strangle','Iron Butterfly','IronButterfly','Iron Butterfly','Short Strangle','Short Straddle','Strategy1',
        'ShortStraddle','Strategy2','Strategy1','Strategy2','Short Straddle'],
        '21-Jun-2024': ['Iron Condor','Iron Butterfly','Iron Butterfly','Iron Butterfly','IronCondor'],
        }
    },
    {
        'View': 'Volatile',
        'Value': {
        '02-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','LongStraddle','Strategy1','Long Straddle','Strategy1','Strategy1','Spread-Strategy','Long Straddle'],
        '09-May-2024': ['Long Straddle','Long Straddle','Long Strangle','Long Strangle','LongStraddle','Strategy1','Long Straddle','Strategy2','Strategy1','Strategy2','Long Straddle'],
        '31-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','LongStraddle'],
        }
    }
]

const dropdownSelected = document.querySelector('.dropdown-selected');
const dropdownList = document.querySelector('.dropdown-list');
const strategyContainer = document.getElementById('strategy-container');
let selectedView = 'Bullish';

function populateDropdown() {
    dropdownList.innerHTML = '';  
    dateArray.forEach((date, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = date;
        listItem.addEventListener('click', () => {
            dropdownSelected.textContent = date;
            dropdownList.style.display = 'none';  
            renderStrategies();  
        });
        dropdownList.appendChild(listItem);

        if (index === 0) {
            dropdownSelected.textContent = date;
        }
    });
}

dropdownSelected.addEventListener('click', () => {
    dropdownList.style.display = dropdownList.style.display === 'none' ? 'block' : 'none';
});

document.addEventListener('click', function (event) {
    if (!dropdownSelected.contains(event.target)) {
        dropdownList.style.display = 'none';
    }
});

const buttons = document.querySelectorAll('.btn-container button');
buttons.forEach(button => {
    button.addEventListener('click', function () {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedView = button.textContent;

        populateDropdown();  
        renderStrategies();
    });
});

function renderStrategies() {
    const selectedDate = dropdownSelected.textContent;
    strategyContainer.innerHTML = ''; 

    const strategies = strategyArray.find(strategy => strategy.View === selectedView)?.Value[selectedDate];

    if (!strategies || strategies.length === 0) {
        strategyContainer.innerHTML = `<div>No strategies found for ${selectedDate}</div>`;
    } else {
        const strategyCountMap = strategies.reduce((acc, strategy) => {
            acc[strategy] = (acc[strategy] || 0) + 1;
            return acc;
        }, {});

        for (const [strategyName, count] of Object.entries(strategyCountMap)) {
            const strategyLabel = count > 1 ? 'Strategies' : 'Strategy';
            const strategyCard = document.createElement('div');
            strategyCard.classList.add('strategy-card');
            strategyCard.innerHTML = `<strong>${strategyName}</strong> <span style="float:right">${count} ${strategyLabel}</span>`;
            strategyContainer.appendChild(strategyCard);
        }
    }
}

populateDropdown();  
renderStrategies();  