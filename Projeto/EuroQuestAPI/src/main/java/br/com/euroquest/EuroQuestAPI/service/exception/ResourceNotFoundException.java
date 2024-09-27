package br.com.euroquest.EuroQuestAPI.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(Long id) {
        super("Recurso não encontrado: ID " + id);
    }

    public ResourceNotFoundException() {
        super("Recurso não encontrado");
    }


}
