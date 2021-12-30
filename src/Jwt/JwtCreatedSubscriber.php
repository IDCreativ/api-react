<?php

namespace App\Jwt;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{
    public function updateJwtData(JWTCreatedEvent $event)
    {
        // 1. Récupérer l'utilisateur (pour avoir son firstname et lastname)
        $user = $event->getUser();

        // 2. Enrichir les data avec ces données
        $data = $event->getData();
        $data['firstName'] = $user->getFirstName();
        $data['LastName'] = $user->getLastName();

        $event->setData($data);
    }
}