package br.com.euroquest.EuroQuestAPI.model;

import lombok.Getter;

@Getter
public enum Theme {

    THEME1("theme1"),
    THEME2("theme2"),
    THEME3("theme3");

    private final String name;

    Theme(String name) {
        this.name = name;
    }

    public static Theme fromString(String text) {
        for (Theme theme : Theme.values()) {
            if (theme.name.equalsIgnoreCase(text)) {
                return theme;
            }
        }
        throw new IllegalArgumentException("No theme matching: " + text);
    }
}
