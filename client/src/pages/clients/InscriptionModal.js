import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InscriptionModal = ({ isOpen, onClose, formationId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      
      const response = await axios.post("http://localhost:5000/auth/check-user", {
        email,
        password,
      });
     console.log(response.data)
      if (response.data.exists) {
        
        await axios.post("http://localhost:5000/inscription", {
          idUser: response.data.userId,
          idFormation: formationId,
        });

        toast({
          title: "Inscription réussie",
          description: "Vous êtes maintenant inscrit à la formation.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } else {
       
        toast({
          title: "Utilisateur non trouvé",
          description: "Vous serez redirigé vers la page d'inscription.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/registration"); // Redirect to register page
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Inscription à la formation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
         

          <FormControl id="email" mt={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" mt={4} isRequired>
            <FormLabel>Mot de passe</FormLabel>
            <Input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={loading}>
            S'inscrire
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Fermer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InscriptionModal;
