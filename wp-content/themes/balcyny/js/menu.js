/**
 * Skrypty strony:
 * - rozwijane menu: otwiera się po najechaniu myszką (CSS); pozycja z adresem „#”
 *   (Produkcja, Doświadczenia, O nas) nie prowadzi nigdzie, kliknięcie lub dotknięcie tylko rozwija podmenu,
 * - pytanie przed usunięciem aktualności,
 * - temat formularza kontaktowego wybrany z adresu (np. /kontakt/?temat=wizyta).
 */
jQuery( function ( $ ) {
	var $rodzice = $( '.menu-glowne .menu-item-has-children' );

	$rodzice.children( 'a[href="#"]' ).on( 'click', function ( e ) {
		var $li = $( this ).parent();
		e.preventDefault();
		$rodzice.not( $li ).removeClass( 'otwarte' );
		$li.toggleClass( 'otwarte' );
	} );

	// Formularz „Dodaj aktualność”: pytanie przed usunięciem wpisu.
	$( '.moje-wpisy .usun' ).on( 'click', function ( e ) {
		if ( ! window.confirm( 'Na pewno usunąć aktualność „' + $( this ).data( 'tytul' ) + '”?' ) ) {
			e.preventDefault();
		}
	} );

	// Formularz kontaktowy: ?temat=wizyta wybiera pierwszą opcję listy „Temat”, która zaczyna się
	// od tego słowa („Wizyta grupy…”). Wielkość liter i polskie znaki nie mają znaczenia.
	var temat = new URLSearchParams( window.location.search ).get( 'temat' );
	if ( temat ) {
		var uprosc = function ( tekst ) {
			return tekst.toLowerCase().normalize( 'NFD' ).replace( /[̀-ͯ]/g, '' ).replace( /ł/g, 'l' );
		};
		$( '.formularz-kontaktowy select[name="temat"] option' ).each( function () {
			if ( this.value && uprosc( this.value ).indexOf( uprosc( temat ) ) === 0 ) {
				$( this ).prop( 'selected', true );
				return false; // wystarczy pierwsza pasująca opcja
			}
		} );
	}

	// Kliknięcie poza menu zamyka podmenu.
	$( document ).on( 'click', function ( e ) {
		if ( ! $( e.target ).closest( '.menu-glowne' ).length ) {
			$rodzice.removeClass( 'otwarte' );
		}
	} );
} );
