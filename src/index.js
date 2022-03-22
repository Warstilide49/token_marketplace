import {populateSales} from "./saleHandling.js"
import * as mint from "./mint.js"

import 'regenerator-runtime/runtime'
import { initContract, login, logout, clearContentBody, provokeLogin} from './utils'

function createHeader(){
	const header=document.createElement("div");
	header.id='header';

	let state=window.walletConnection.isSignedIn();
	
	header.innerHTML=`	<div id='name'>Ignitus Networks</div>
						<div id="tabs">
							<div class="cursor" id="home_redirect">Home</div>
							<div class="cursor" id="mint_redirect">Mint</div>
							<button id="login_button">${state ? 'Log Out' : 'Log In'}</button>
						</div>`

	let button=header.querySelector('#login_button');

	button.addEventListener('click',()=>{
		if (state){
			logout();
		}
		else{
			login();
		}
	})
	
	let homeButton=header.querySelector('#home_redirect');
	homeButton.addEventListener('click', home);
	
	let mintButton=header.querySelector('#mint_redirect');
	mintButton.addEventListener('click', mint.createDOM);
	return header;
}

function welcome(){
	const container=document.createElement("div");
	container.id="introduction";

	container.innerHTML=	`<div id='welcome_container'>
								<div id='welcome'>Welcome to our marketplace to buy, sell and discover NFTs!</div>
								<div id='subtext'>It is one of the largest NFT marketplaces around!</div>
							</div>`

	const item=document.createElement('div');

	item.innerHTML=`<img src="imgs/image_0.jpg" height=280 class='item_image'>
					<div class='item_info'>
						<div class='item_left'>
							<div class='item_owner'>An Example NFT</div>
							<div class='item_bid'>Cost: 2 units</div>
						</div>
					</div>`

	item.id='item_container';
	//createItem("imgs/image_0.jpg","An Example NFT","2 units",280,false);

	container.appendChild(item);

	return container;
}

function createBody(){
	const container=document.createElement("div");
	container.id="body_container";

	provokeLogin(container,'Please Log In with your NEAR Wallet To Buy the Nfts on Sale!');

	container.innerHTML+=`<div id="body_title">Items At Sale From Our Nft Contract!</div>
						<div id="main_sale_container"></div>`
	return container;
}

function footer(){
	const footer=document.createElement("footer");
	footer.id='footer';
	footer.innerHTML=`<div id="footer_content">Made by Ignitus Networks, powered by NEAR</div>`;
	return footer;
}

function initialSite(){

	const content=document.getElementById("content")
	content.appendChild(createHeader());
	content.appendChild(welcome());
	content.appendChild(createBody());
	content.appendChild(footer());
}

function home(){
  clearContentBody()
  let content=document.getElementById("content");
  let footer=document.getElementById("footer");

  content.insertBefore(welcome(), footer);
  content.insertBefore(createBody(), footer);

  populateSales()
}

window.nearInitPromise = initContract().then(initialSite).then(populateSales);

//setInterval(sale.populateSales, 2000);		//Causing problems since I am deleting the containers
