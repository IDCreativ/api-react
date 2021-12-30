<?php

namespace App\Events;

use App\Entity\Invoice;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class InvoiceChronoSentAtSubscriber implements EventSubscriberInterface
{
    private $security;
    private $invoiceRepository;

    public function __construct(
        Security $security,
        InvoiceRepository $invoiceRepository
    )
    {
        $this->security = $security;
        $this->invoiceRepository = $invoiceRepository;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForInvoice(ViewEvent $event)
    {
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($result instanceof Invoice && $method === 'POST') {
            $nextChrono = $this->invoiceRepository->findNextChrono($this->security->getUser());
            $result->setChrono($nextChrono);

            if (empty($result->getSentAt())) {
                $result->setSentAt(new \DateTime());
            }
        }
    }
}
