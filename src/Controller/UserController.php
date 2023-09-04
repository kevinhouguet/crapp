<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    public function __construct(private UserRepository $userRepository)
    {
    }

    #[Route('/user', methods: ['GET'])]
    public function get(Request $request) : JsonResponse
    {
        $id = $request->get('id');
        $userInDb = $this->userRepository->findOneBy(['id' => $id]);
        $user = [
            'id' => $userInDb->getId(),
            'username' => $userInDb->getUsername(),
            'password' => $userInDb->getPassword(),
        ];
        return new JsonResponse($user);
    }
    #[Route('/user', methods: ['POST'])]
    public function new(EntityManagerInterface $entityManager, Request $request) : JsonResponse
    {
        $data = $request->request->all();
        $user = new User();
        $user->setUsername($data['username']);
        $user->setPassword($data['password']);

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(sprintf('User %s successfully created', $user->getUsername()));
    }
    #[Route('/user', methods: ['PATCH'])]
    public function update(EntityManagerInterface $entityManager) : JsonResponse
    {
        $user = $this->userRepository->findOneBy(['id' => 1]);
        $user->setPassword('azerty');

        $entityManager->flush();

        return new JsonResponse(sprintf('User %s successfully updated', $user->getUsername()));
    }

    #[Route('/user', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, Request $request) : JsonResponse
    {
        $id = $request->get('id');
        $user = $this->userRepository->findOneBy(['id' => $id]);

        if (!$user) {
          return new JsonResponse(sprintf('User with id %s not found', $id), 404);
        }

        $entityManager->remove($user);
        $entityManager->flush();

        return new JsonResponse(sprintf('User %s successfully deleted', $user->getUsername()));
      }
}