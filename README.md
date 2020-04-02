<style type="text/css">
	html,body{
		background-color: #f7f9fc;
		scroll-behavior: smooth;
	}
	/* width */
	::-webkit-scrollbar {
	  width: 5px;
	}

	/* Track */
	::-webkit-scrollbar-track {
	  /* box-shadow: inset 0 0 5px grey; */
	  border-radius: 2px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
	  background: rgb(119, 8, 194);
	  /* border-radius: 10px; */
	}
	.demo{
		padding: 5px;
		display: grid;
		grid-template-columns: repeat(1, minmax(100%, 1fr));
		grid-gap: 5px;
	}
	.img-demo{
		/*box-shadow: 0px 0px 7px -1px #000;*/
		box-shadow: 0px 2px 7px -1px rgba(0,0,0,.5);
		border-radius: 2px;
	}

	.header{
		position: fixed;
		top: 0;
		background-color: #fff;
		padding: 10px;
		box-shadow: 0px 2px 7px -1px rgba(0,0,0,.2);
		width: 100%;
		left: 0;
		text-align: center;
	}
	.header ul{
		list-style: none;
		padding: 0;
		margin:0;
	}
	.header ul li{
		display: inline-block;
		margin-right: 20px;
	}
	.header ul li a{
		text-decoration: none;
		color: #000;
		text-transform: capitalize;
		font-size: 14px;
	}
	.header ul li a:hover{
		text-decoration: none;
		color: salmon;
	}
	section{
		padding-top: 20px;
	}
	.app{
		background-color: #eaeaea;
		color: #fff;
		font-weight: bold;
		padding: 2px 5px;
		border-radius: 10px
	}
	.app a{
		color: #fff;
	}
</style>

<div class="header">
	<ul>
		<li><a href="#">home</a></li>
		<li><a href="#requirements">requirements</a></li>
		<li><a href="#run">How To Run</a></li>
		<li><a href="#screenshoot">screenshoot</a></li>
		<li><a href="#project">related project</a></li>
		<li class="app"><a href="http://localhost:3000" target="_blank">go to app</a></li>
	</ul>
</div>


<section id="home">
	
<h1 align="center">Hayuu Cafe Front-end</h1>

Hayuu cafe is an application to manage sales at hayuu cafe, build with ReactJS.
</section>

<section id="requirements">
	
## Requirements
* [`npm`](https://www.npmjs.com/get-npm)
* [`React Js`](https://www.npmjs.com/get-npm)
* [`react-bootsrap`](https://www.npmjs.com/get-npm)
* [`sweetalert`](https://www.npmjs.com/get-npm)
</section>

<section id="run">
	
## How To Run
1. Open your terminal or command prompt
2. Type `git clone https://github.com/misrudin/Front-end-PointOfSales.git`
3. Open the folder and type `npm install` for install dependencies
	#### Setup .env
		Open .env file on your favorite code editor, and copy paste this code below :
		```
		REACT_APP_URL="http://localhost:4001/api/v1/"
		```
4. type `npm start` for run dependencies
</section>

<section id="screenshoot">
	
## Screenshoot
<div class="demo">
    <div class="items">
    	<h4 class="title-demo">Login Page</h4>
		<img class="img-demo" src="./demo/login.png">  
    </div>
    <div class="items">
    	<h4 class="title-demo">Home Page</h4>
		<img class="img-demo" src="./demo/list.png">  
    </div>
    <div class="items">
    	<h4 class="title-demo">History</h4>
		<img class="img-demo" src="./demo/history.png">  
    </div>
    <div class="items">
    	<h4 class="title-demo">Add Product</h4>
		<img class="img-demo" src="./demo/mproduct.png">  
    </div>
    <div class="items">
    	<h4 class="title-demo">Add Category</h4>
		<img class="img-demo" src="./demo/mcategory.png">  
    </div>
</div>
</section>

<section id="project">
	
## Related Project
* [`Hayuu-Cafe-Backend`](https://github.com/misrudin/NodeWithExpress-backend-PointOfSales.git)
* [`Hayuu-Cafe-Mobile`](https://github.com/misrudin/PosReactNative.git)
</section>
