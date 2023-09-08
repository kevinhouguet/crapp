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
            'name' => $userInDb->getName(),
            'surname' => $userInDb->getSurname(),
            'email' => $userInDb->getEmail(),
        ];
        return new JsonResponse(['data' => $user, 'OK' => 200]);
    }

    #[Route('/api/truc', methods: ['PUT'])]
    public function update(Request $request, EntityManagerInterface $entityManager) : JsonResponse
    {
        $token = $request->headers->get('authorization');
        $id = substr($token, 7);
        // $data = $request->request->get('name');
        $data = $request->getContent();
        // $userInDb = $this->userRepository->findOneBy(['id' => $id]);
        // if (!$userInDb) {
        //     return new JsonResponse(['message' => sprintf('User with id %s not found', $id), 'error' => 404]);
        // }
        // $userInDb->setName($data['name']);
        // $userInDb->setSurname($data['surname']);

        // $entityManager->flush();

        // $user = [
        //     'id' => $userInDb->getId(),
        //     'name' => $userInDb->getName(),
        //     'surname' => $userInDb->getSurname(),
        //     'email' => $userInDb->getEmail(),
        // ];

        // return new JsonResponse(['data' => $user, 'OK' => 200]);
        return new JsonResponse(['data' => $data, 'id' => $id, 'OK' => 200]);
    }

    #[Route('/api/password', methods: ['PATCH'])]
    public function updatePassword(EntityManagerInterface $entityManager) : JsonResponse
    {
        $user = $this->userRepository->findOneBy(['id' => 1]);
        $user->setPassword('azerty');

        $entityManager->flush();

        return new JsonResponse(sprintf('User %s successfully updated'));
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

        return new JsonResponse(sprintf('User %s successfully deleted', $user->getEmail()));
      }
}