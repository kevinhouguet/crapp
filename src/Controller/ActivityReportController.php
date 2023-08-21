<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

use Knp\Snappy\Pdf;
use Symfony\Component\HttpFoundation\Response;

class ActivityReportController extends AbstractController
{
    #[Route('/activity-report')]
    public function pdfAction(Pdf $knpSnappyPdf) 
    {
        $report = $_POST;
        $knpSnappyPdf->setOption('encoding', 'utf-8');

        $html = $this->renderView('pdf/pdf.html.twig', [
            'title' => 'Hello World !',
            'report' => $report
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