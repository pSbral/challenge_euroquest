package br.com.euroquest.EuroQuestAPI.service.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(Long id) {
        super("Recurso não encontrado: ID " + id);
    }

    public ResourceNotFoundException() {
        super("Recurso não encontrado");
    }


}
