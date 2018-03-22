<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\View\View;
use AppBundle\Entity\post;

class crudApiController extends FOSRestController
{
  /**
  *@Rest\Post("/api")
  */
  public function indexAction(Request $request){

    $post = new post;

    $topic = $request->get("topic");
    $desc = $request->get("description");

    $post->setTopic($topic);
    $post->setDescription($desc);
    $em = $this->getDoctrine()->getManager();
    $em->persist($post);
    $em->flush();

    return new view("Added!!", Response::HTTP_OK);

  }
  /**
  *@Rest\Get("/api")
  */
  public function getAction(Request $request){

    $data = $this->getDoctrine()->getRepository("AppBundle:post")->findAll();

    if($data===null){

      return new View("Data Doesn't exist", Response:: HTTP_NOT_FOUND);
    }

    return $data;

  }
  /**
  *@Rest\Put("/api/{id}")
  */
  public function updateAction($id, Request $request){

    $data = new post;
    $topic = $request->get("topic");
    $description = $request->get("description");
    $em = $this->getDoctrine()->getManager();
    $post = $this->getDoctrine()->getRepository("AppBundle:post")->find($id);

    $post->setTopic($topic);
    $post->setDescription($description);

    $em->flush();

    return new View("Updated!!", Response:: HTTP_OK);
  }
  /**
  *@Rest\Delete("/api/{id}")
  */

  public function deleteAction($id){

    $post = new post;
    $em = $this->getDoctrine()->getManager();
    $data = $this->getDoctrine()->getRepository("AppBundle:post")->find($id);
    $em->remove($data);
    $em->flush();

    return new View("Deleted!!", Response:: HTTP_OK);
  }

}
