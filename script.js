/*  
 *  Modifié par NIELS | 28dec2020 | 14h30
 */


/* Ci dessous :  
 *  On débute par la fonction qui va permettre d'entrer la valeur désirée par l'utilisateur.
 *  Nous passons 2 arguments dans la fonction, le champ texte, et le tableau dans lequel sont stockées les valeurs
 */

function autoInput(text, tab) {
    var selection;    
    text.addEventListener("input", function(e) {        
        var a, b, i, val = this.value;
        closeLists();                                
        if (!val) { return false;}
        selection = -1;
        a = document.createElement("DIV");              
        a.setAttribute("id", this.id + "autoInputList");
        a.setAttribute("class", "autoInputItems");
        this.parentNode.appendChild(a);
      
        for (i = 0; i < tab.length; i++) {
          let txtAfterAt = val.split('@');
          if (tab[i].includes(txtAfterAt[1])) {
            b = document.createElement("DIV");
            //b.innerHTML = txtAfterAt[1];
            b.innerHTML = tab[i].substr(0,val.length);
            b.innerHTML += tab[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + tab[i] + "'>";
            b.addEventListener("click", function(e) {
              text.value = txtAfterAt[0];
                text.value += this.getElementsByTagName("input")[0].value;
                closeLists();
            });
            a.appendChild(b);
          }
        }
    });

    /* Ci dessous :  
     *  Vous pouvez rechercher, à l'aide du clavier (touche up & down) la bonne valeur
     *  Celle ci sera validée par la touche "entrée". 
     */
    text.addEventListener("keydown", function(e) {
        var list = document.getElementById(this.id + "autoInputList");
        if (list) list = list.getElementsByTagName("div");
        if (e.keyCode == 40) {
          selection++;
          addActive(list);
        } else if (e.keyCode == 38) { 
          selection--;
          addActive(list);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (selection > -1) {
            if (list) list[selection].click();
          }
        }
    });
    /* Ci dessous :  
     *  est affiché la valeur active
     */
    function addActive(list) {
      if (!list) return false;
      removeActive(list);
      if (selection >= list.length) selection = 0;
      if (selection < 0) selection = (list.length - 1);
      list[selection].classList.add("autoInput-active");
    }
    /* Ci dessous :  
     * on "désaffiche" la valeur qui n'est plus active
     */
    function removeActive(list) {
      for (var i = 0; i < list.length; i++) {
        list[i].classList.remove("autoInput-active");
      }
    }
    /* Ci dessous :  
     * Fermeture de l'élément liste
     */
    function closeLists(elmnt) {
      var list = document.getElementsByClassName("autoInputItems");
      for (var i = 0; i < list.length; i++) {
        if (elmnt != list[i] && elmnt != text) {
          list[i].parentNode.removeChild(list[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeLists(e.target);
    });
  }
  
  var mails = ["@gmail.com", "@outlook.fr", "@outlook.com", "@hotmail.fr", "@hotmail.co.uk", "@hotmail.co.au", "@hotmail.com", "@hotmail.co.za", "@yahoo.fr", "@yahoo.co.uk", "@yahoo.co.au", "@yahoo.co.za", "@yahoo.com", "@laposte.net", "@mail.fr", "@mail.com", "@mail.ru", "@protonmail.fr", "@gmx.fr", "@gmx.com", "@icloud.fr", "@icloud.com", "@planity.fr", "@planity.com", "@monmail.fr", "@monmail.com"];
  
  autoInput(document.getElementById("myInput"), mails);