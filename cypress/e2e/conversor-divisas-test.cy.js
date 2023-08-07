context('Conversor de divisas', () => {
    const URL = 'http://192.168.0.81:8080/';
    const DIVISA_ARGENTINA = "ARS";
    const FECHA_ACTUAL = new Date().toISOString().split('T')[0];
    const MENSAJE = `Los cambios de 1 ARS, para el día ${FECHA_ACTUAL} son:`;

    before(()=>{
        cy.visit(URL);
    })
    
    describe("Tests de Interfaz con valores incorrectos", () => {
        it("Prueba que al obtener cambios sin una base, no se muestren resultados",() => {
            cy.get("#convertir").click();
            cy.get("#resultados").should("have.class","oculto");
            cy.get("#cargando").should("have.class","oculto");
            cy.get("#error-base").should("not.have.class","oculto");
        });
    });

    describe("Tests de obtención de divisas", () => {
        before(()=> {
            cy.get("#bases").select(DIVISA_ARGENTINA);
            cy.get("#convertir").click();
        })

        it(`Testea que se muestre "cargando" al buscar una divisa`, () => {
            cy.get("#cargando").should("not.have.class","oculto");
        });

        it(`Testea que se muestre el mensaje correcto al buscar una divisa`, () => {
            cy.get("#texto-resultado").should("have.text",MENSAJE);
        });

        it(`Testea que se generen resultados al obtener una divisa`,() => { 
            cy.get("#lista-conversiones tr").should('have.length.of.at.least', 5);
        });

        it(`Testea que los resultados sean visibles`, () => {
            cy.get("#resultados").should("not.have.class","oculto");
        });

    });
})
