<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VinylController extends AbstractController{

  #[Route('/')]
    public function index() : Response {
      return $this->render('vinyl/index.html.twig',[
        'title' => 'This is Vinyls page',
      ]);
    }

    #[Route('/vinyls')]
    public function vinyls() : Response{
      return new Response('Welcome to your new vinyls controller !');
    }

}