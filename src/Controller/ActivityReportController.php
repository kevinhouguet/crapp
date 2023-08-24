<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

use Knp\Snappy\Pdf;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class ActivityReportController extends AbstractController
{
    #[Route('/activity-report')]
    public function pdfAction(Pdf $knpSnappyPdf, LoggerInterface $logger, Request $request) 
    {
        $knpSnappyPdf->setOption('encoding', 'utf-8');

        $data = json_decode($request->getContent(), true); // get data from request
        // $data = [{"day":"1","activity":"1","customers":"qwe","project":"qwe","tasks":"qwe"}]; // test data

        $html = $this->renderView('pdf/pdf.html.twig', [
            'title' => 'Hello World !',
            'data' => $data
        ]);

        $finename = 'custom_pdf_from_twig'; // change this dynamically

        try {
            $response = new Response(
                $knpSnappyPdf->getOutputFromHtml($html),
                200,
                [
                    'Content-Type' => 'application/pdf',
                    'Content-Disposition' => 'inline; filename="' . $finename . '.pdf"'
                ]
            );
        } catch (\Exception $e) {
            $response = new Response($e->getMessage());
        }

        return $response;

    }
}