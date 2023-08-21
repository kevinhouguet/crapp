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
        $knpSnappyPdf->setOption('encoding', 'utf-8');

        $html = $this->renderView('pdf.html.twig', [
            'title' => 'Hello World !'
        ]);

        $finename = 'custom_pdf_from_twig';

        return new Response(
            $knpSnappyPdf->getOutputFromHtml($html),
            200,
            array(
            'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'inline; filename="'.$finename.'.pdf"'
            )
        );
        
    }
}