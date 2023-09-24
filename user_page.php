<?php

@include 'config.php';

session_start();

if(!isset($_SESSION['user_name'])){
   header('location:index.php');
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BiblioSphere</title>
  <link rel="shortcut icon" href="./img/rocket.svg" type="image/x-icon">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
  
</head>

<body class="bg">
  <script>
    const localTheme = localStorage?.getItem("theme");
    if (localTheme === "dark") {
      document.body.classList.add("dark-theme");
      whitecolor();
    } else {
      document.body.classList.remove("dark-theme");
      blackcolor();
    }
  </script>

  <div class="preloader">
    <div class="dots-container">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="preloader-text">
      Loading...
    </div>
  </div>

  <nav id="nav">
    <div class="container-fluid align-items-center">
      <img id="logo" src="./img/mainLogo.svg" alt="logo">
      <a class="navbar-brand" href="./user_page.php">
        <span class="text">Welcome </span><span class="find"><span><?php echo $_SESSION['user_name'] ?>!</span></span>
      </a>
      <div class="mode d-flex align-items-center">
        <ul class="nav-menu">
           <li class="nav-item">
             <a class="nav-link" href="register_form.php"> <span class="find">New Account ?</span></a>
           </li>
          <li class="nav-item">
            <a class="nav-link" href="logout.php"> <span class="find">Log Out</span></a>
          </li>
          
        </ul>
        

        <img class="dark-mode" id="icon" src="img/moon.png" alt="Toggle Dark Mode" />
        <div class="hamburger">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
    </div>
  </nav>

  <header class="header" id="header">
    <img src="./img/mainImage.svg" alt="" class="illustration" />
    <h1 class="title">
     Biblio: 
      <p class="finder">Sphere</p>
    </h1>
  </header>
  <div class="search" id="search-bar">
    <form class="search-form">
      <div class="p-1 rounded rounded-pill shadow-sm mb-5">
        <div class="input-group" autocomplete = "off">
          <input type="search" id="input" placeholder="Search your books here..."
            aria-describedby="button-addon1" class="form-control border-0 " />
          <div class="input-group-append">
            <button id="button-addon1" type="submit" class="icon btn btn-link text-primary" aria-label="Search">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
        <ul class="list"></ul>
      </div>
    </form>
  </div>
  <div class="whirly-loader" style="display: none;"></div>
  <div id="results" class="results container"></div>

  <a href="#" id="return-to-top" class="scroll-container">
    <i class="fa fa-arrow-up"></i>
  </a>

  <div id="pagination-wrapper" class="pagination-wrapper hidden">
    <svg class="dots btn--prev" onclick="prevPage()" id="prev-btn" height="96" viewBox="0 0 24 24" width="96"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
      <path d="M0-.5h24v24H0z" fill="none" />
    </svg>

    <div class="pagination-container">
      <div class="little-dot  little-dot--first"></div>
      <div class="little-dot">
        <div class="big-dot-container">
          <div class="big-dot"></div>
        </div>
      </div>
      <div class="little-dot  little-dot--last"></div>
    </div>

    <svg class="dots btn--next" onclick="nextPage()" id="next-btn" height="96" viewBox="0 0 24 24" width="96"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
      <path d="M0-.25h24v24H0z" fill="none" />
    </svg>
  </div>
  <footer class="foot">
    <div>
      Made with ❤️ by <a href="https://github.com/Priyanshu-Singh-1"><span style="color: white;">Priyanshu Singh</span></a>
    </div>
    <div class="icons">
      <a class="twitter" href="https://github.com/Priyanshu-Singh-1" target="_blank">
        <i class="fa fa-github"></i>
      </a>
      <a class="linkedin" href="https://www.linkedin.com/in/sublime-priyanshu" target="_blank">
        <i class="fa fa-linkedin"></i>
      </a>
      
    </div>
  </footer>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
  <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
  <script>
    AOS.init({
      offset: 200,
      duration: 1000
    });
  </script>
  <script src="./js/main.js"></script>
  <script src="./js/pagination.js"></script>
  <script src="./js/preloader.js"></script>
  <script src="./js/suggestions.js"></script>
</body>

</html>