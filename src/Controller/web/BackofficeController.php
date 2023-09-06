<?php

namespace App\Controller\web;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BackofficeController extends AbstractController {
  #[Route('/backoffice')]
  public function index() {
    return $this->render('backoffice/index.html.twig', [
      'controller_name' => 'BackOffice',
      'title' => 'BackOffice',
    ]);
  }
}