package br.com.euroquest.EuroQuestAPI.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequestMapping("/euro")
public class HomeController {

    @GetMapping("/admin")
    public RedirectView redirectToAdmin() {
        return new RedirectView("/euro/admin");
    }

    @GetMapping("/user")
    public RedirectView redirectToUser() {
        return new RedirectView("/euro/user");
    }
}
