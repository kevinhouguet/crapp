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

    #[Route('/api/signin', methods: ['POST'])]
    public function login(Request $request) : JsonResponse
    {
        $data = $request->request->all();
        $user = $this->userRepository->findOneBy(['email' => $data['email']]);
        if (!$user) {
            return new JsonResponse(['message' => sprintf('User %s not found', $data['email']), 'error' => 404]);
        }
        if ($user->getPassword() !== $data['password']) {
            return new JsonResponse(['message' => 'Wrong Password', 'error' => 400]);
        }
        return new JsonResponse(['token' => $user->getId(), 'OK' => 200]);
    }

    #[Route('/api/signup', methods: ['POST'])]
    public function signup(EntityManagerInterface $entityManager, Request $request) : JsonResponse
    {
        $data = $request->request->all();
        $user = $this->userRepository->findOneBy(['email' => $data['email']]);
        if ($user) {
            return new JsonResponse(['message' => sprintf('User %s already exists', $data['email']), 'error' => 400]);
        }
        $user = new User();
        $user->setPassword($data['password']);
        $user->setEmail($data['email']);

        $entityManager->persist($user);
        $entityManager->flush();
        
        return new JsonResponse(['token' => $user->getId(), 'OK' => 200]);
    }


    #[Route('/api/user', methods: ['GET'])]
    public function get(Request $request) : JsonResponse
    {
        $token = $request->headers->get('authorization');
        $id = substr($token, 7);
        $userInDb = $this->userRepository->findOneBy(['id' => $id]);
        if (!$userInDb) {
            return new JsonResponse(['message' => sprintf('User with id %s not found', $id), 'error' => 404]);
        }
        $user = [
            'id' => $userInDb->getId(),
            'username' => $userInDb->getUsername(),
            'password' => $userInDb->getPassword(),
            'email' => $userInDb->getEmail(),
        ];
        return new JsonResponse(['data' => $user, 'OK' => 200]);
    }
    // #[Route('/api/user', methods: ['POST'])]
    // public function new(EntityManagerInterface $entityManager, Request $request) : JsonResponse
    // {
    //     $data = $request->request->all();
    //     $user = new User();
    //     $user->setUsername($data['username']);
    //     $user->setPassword($data['password']);
    //     $user->setEmail($data['email']);

    //     $entityManager->persist($user);
    //     $entityManager->flush();

    //     return new JsonResponse(sprintf('User %s successfully created', $user->getUsername()));
    // }
    #[Route('/api/user', methods: ['PATCH'])]
    public function update(EntityManagerInterface $entityManager) : JsonResponse
    {
        $user = $this->userRepository->findOneBy(['id' => 1]);
        $user->setPassword('azerty');

        $entityManager->flush();

        return new JsonResponse(sprintf('User %s successfully updated', $user->getUsername()));
    }

    #[Route('/api/user', methods: ['DELETE'])]
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