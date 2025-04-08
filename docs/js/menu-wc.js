'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">out-challenge documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/TableModule.html" data-type="entity-link" >TableModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TableModule-048a411a42f07f376b1b51bd2fad825e6b62bbd6e325d9e1a04222701da28661fa024693bd69407ce5736b1e4e0e8d36d44499046d928f746fa7e3eafa874823"' : 'data-bs-target="#xs-components-links-module-TableModule-048a411a42f07f376b1b51bd2fad825e6b62bbd6e325d9e1a04222701da28661fa024693bd69407ce5736b1e4e0e8d36d44499046d928f746fa7e3eafa874823"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TableModule-048a411a42f07f376b1b51bd2fad825e6b62bbd6e325d9e1a04222701da28661fa024693bd69407ce5736b1e4e0e8d36d44499046d928f746fa7e3eafa874823"' :
                                            'id="xs-components-links-module-TableModule-048a411a42f07f376b1b51bd2fad825e6b62bbd6e325d9e1a04222701da28661fa024693bd69407ce5736b1e4e0e8d36d44499046d928f746fa7e3eafa874823"' }>
                                            <li class="link">
                                                <a href="components/ShimmerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShimmerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpinnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CardComponent.html" data-type="entity-link" >CardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListComponent.html" data-type="entity-link" >ListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListTableComponent.html" data-type="entity-link" >ListTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuComponent.html" data-type="entity-link" >MenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MovieWinnersByYearComponent.html" data-type="entity-link" >MovieWinnersByYearComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MovieWinnersByYearSearchFormComponent.html" data-type="entity-link" >MovieWinnersByYearSearchFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MovieWinnersByYearTableComponent.html" data-type="entity-link" >MovieWinnersByYearTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PaginatorComponent.html" data-type="entity-link" >PaginatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProducersIntervalComponent.html" data-type="entity-link" >ProducersIntervalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProducersIntervalTableComponent.html" data-type="entity-link" >ProducersIntervalTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ShimmerComponent.html" data-type="entity-link" >ShimmerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SpinnerComponent.html" data-type="entity-link" >SpinnerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StateComponent.html" data-type="entity-link" >StateComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ToolbarComponent.html" data-type="entity-link" >ToolbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TopWinnersComponent.html" data-type="entity-link" >TopWinnersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WinnerHeaderCellComponent.html" data-type="entity-link" >WinnerHeaderCellComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/YearHeaderCellComponent.html" data-type="entity-link" >YearHeaderCellComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/YearsMultipleWinnersComponent.html" data-type="entity-link" >YearsMultipleWinnersComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CustomValidators.html" data-type="entity-link" >CustomValidators</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BaseApiService.html" data-type="entity-link" >BaseApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MoviesService.html" data-type="entity-link" >MoviesService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IListData.html" data-type="entity-link" >IListData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMovie.html" data-type="entity-link" >IMovie</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMovieFilter.html" data-type="entity-link" >IMovieFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPageable.html" data-type="entity-link" >IPageable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProducerIntervalItem.html" data-type="entity-link" >IProducerIntervalItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProducersInterval.html" data-type="entity-link" >IProducersInterval</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISort.html" data-type="entity-link" >ISort</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStudioTopWinner.html" data-type="entity-link" >IStudioTopWinner</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStudioTopWinnerItem.html" data-type="entity-link" >IStudioTopWinnerItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IYearsMultipleWinners.html" data-type="entity-link" >IYearsMultipleWinners</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IYearsMultipleWinnersItem.html" data-type="entity-link" >IYearsMultipleWinnersItem</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/YesNoPipe.html" data-type="entity-link" >YesNoPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});