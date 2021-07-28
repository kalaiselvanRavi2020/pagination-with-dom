let request = new XMLHttpRequest();

request.open('GET', 'https://61015c684e50960017c29daa.mockapi.io/pagination/users', true);
request.send();

let jsonData;
let tableData;

let pageNumber = 1;
let start = 0;
let end = 10;
let totalPages = 0;

request.onload = function () {
  jsonData = JSON.parse(this.response);
  totalPages = jsonData.length / 10;
  loadTableData();
  buildPageUI();
  checkButtons();
};

function loadTableData() {
  tableData = jsonData.slice(start, end);
  buildTbodyUI();
}

function loadPage(i) {
  pageNumber = i;
  start = pageNumber * 10;
  end = pageNumber * 10 + 10;
  console.log(i);
  loadTableData();
  checkButtons();
}

function loadPrevPage() {
  start = start - 10;
  end = end - 10;
  console.log(start, end);
  loadTableData();
  checkButtons();
}

function loadNextPage() {
  start = start + 10;
  end = end + 10;
  console.log(start, end);
  loadTableData();
  checkButtons();
}

// Build Table
let mainDiv = createElement('div');
setAttribute(mainDiv, 'class', 'container');
append(mainDiv);

let table = createElement('table');
setAttribute(table, 'class', 'table table-striped');
appendChild(mainDiv, table);

let thead = createElement('thead');
setAttribute(thead, 'class', 'bg-dark text-light ');
appendChild(table, thead);

let tr = createElement('tr');
appendChild(thead, tr);

let th1 = createElement('th');
setAttribute(th1, 'class', 'text-center');
setAttribute(th1, 'scope', 'col');
th1.innerText = 'S.No';
appendChild(tr, th1);

let th2 = createElement('th');
setAttribute(th2, 'class', 'text-center');
setAttribute(th2, 'scope', 'col');
th2.innerText = 'Name';
appendChild(tr, th2);

let th3 = createElement('th');
setAttribute(th3, 'class', 'text-center');
setAttribute(th3, 'scope', 'col');
th3.innerText = 'Email';
appendChild(tr, th3);

let tbody = createElement('tbody');
appendChild(table, tbody);

// Load Data to Table
function buildTbodyUI() {
  tbody.innerHTML =  " ";
  for (let i = 0; i < tableData.length; i++) {
    let dataTr = createElement('tr');
    let dataTd1 = createElement('td');
    setAttribute(dataTd1, 'class', 'text-center');
    dataTd1.innerText = tableData[i].id;
    let dataTd2 = createElement('td');
    setAttribute(dataTd2, 'class', 'text-center');
    dataTd2.innerText = tableData[i].name;
    let dataTd3 = createElement('td');
    setAttribute(dataTd3, 'class', 'text-center');
    dataTd3.innerText = tableData[i].email;

    appendChild(dataTr, dataTd1);
    appendChild(dataTr, dataTd2);
    appendChild(dataTr, dataTd3);
    appendChild(tbody, dataTr);
  }
}

function checkButtons() {
  let prevButton = document.getElementById('prev');
  if (start === 0) {
    prevButton.className += ' disabled';
    setAttribute(prevButton, 'style', 'cursor: not-allowed;');
  } else {
    prevButton.classList.remove('disabled');
  }

  let nextButton = document.getElementById('next');
  if (end >= jsonData.length) {
    nextButton.className += ' disabled';
    setAttribute(nextButton, 'style', 'cursor: not-allowed;');
  } else {
    nextButton.classList.remove('disabled');
  }
}

function buildPageUI() {
  let paginationDiv = createElement('div');
  setAttribute(paginationDiv, 'class', 'd-flex justify-content-center');
  appendChild(mainDiv, paginationDiv);

  let navBar = createElement('nav');
  setAttribute(navBar, 'aria-label', 'Pagination Data');
  appendChild(paginationDiv, navBar);

  let ul = createElement('ul');
  setAttribute(ul, 'class', 'pagination');
  appendChild(navBar, ul);

  if (totalPages > 1) {
    //Create previous button and add it to the container
    let prevButton = createElement('li');
    setAttribute(prevButton, 'class', 'page-item');
    setAttribute(prevButton, 'id', 'prev');
    appendChild(ul, prevButton);

    let prevHyperLink = createElement('a');
    setAttribute(prevHyperLink, 'class', 'page-link');
    console.log(`start: ${start}`);
    setAttribute(prevHyperLink, 'style', 'cursor: pointer;');
    setAttribute(prevHyperLink, 'onclick', `loadPrevPage()`);

    prevHyperLink.innerText = 'Previous';
    appendChild(prevButton, prevHyperLink);
    appendChild(ul, prevButton);

    //Create Page number buttons
    for (let i = 0; i < totalPages; i++) {
      let pageNumBtn = createElement('li');
     
      setAttribute(pageNumBtn, 'class', 'page-item');
      appendChild(ul, pageNumBtn);

      let pageNumLink = createElement('a');
      setAttribute(pageNumLink, 'class', 'page-link');
      setAttribute(pageNumLink, 'style', 'cursor: pointer;');
      setAttribute(pageNumLink, 'onclick', `loadPage(${i})`);
      pageNumLink.innerText = i + 1;
      appendChild(pageNumBtn, pageNumLink);
      appendChild(ul, pageNumBtn);
    }

    //Create next button and add it to the container
    let nextButton = createElement('li');
    setAttribute(nextButton, 'class', 'page-item');
    setAttribute(nextButton, 'id', 'next');
    appendChild(ul, nextButton);

    let nextHyperLink = createElement('a');
    setAttribute(nextHyperLink, 'class', 'page-link');
    setAttribute(nextHyperLink, 'style', 'cursor: pointer;');
    setAttribute(nextHyperLink, 'onclick', `loadNextPage()`);
    nextHyperLink.innerText = 'Next';
    appendChild(nextButton, nextHyperLink);
    appendChild(ul, nextButton);
  }
}

//reusable functions created for DOM manipulations

function createElement(element) {
    return document.createElement(element);
  }
  
  function append(element) {
    return document.body.append(element);
  }
  
  function appendChild(element, child) {
    return element.appendChild(child);
  }
  
  function setAttribute(element, attribute, value) {
    element.setAttribute(attribute, value);
  }