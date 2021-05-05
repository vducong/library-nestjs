'use strict';

customElements.define(
  'compodoc-menu',
  class extends HTMLElement {
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
                    <a href="index.html" data-type="index-link">library documentation</a>
                </li>

                <li class="divider"></li>
                ${
                  isNormalMode
                    ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>`
                    : ''
                }
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
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${
                              isNormalMode
                                ? 'data-target="#modules-links"'
                                : 'data-target="#xs-modules-links"'
                            }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? 'id="modules-links"'
                            : 'id="xs-modules-links"'
                        }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#controllers-links-module-AppModule-eb34515beace26eb7c36be5f9ebd291d"'
                                            : 'data-target="#xs-controllers-links-module-AppModule-eb34515beace26eb7c36be5f9ebd291d"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-AppModule-eb34515beace26eb7c36be5f9ebd291d"'
                                            : 'id="xs-controllers-links-module-AppModule-eb34515beace26eb7c36be5f9ebd291d"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#controllers-links-module-AuthModule-2e8e6f048b97ed6bb5330e9e147d7478"'
                                            : 'data-target="#xs-controllers-links-module-AuthModule-2e8e6f048b97ed6bb5330e9e147d7478"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-AuthModule-2e8e6f048b97ed6bb5330e9e147d7478"'
                                            : 'id="xs-controllers-links-module-AuthModule-2e8e6f048b97ed6bb5330e9e147d7478"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#injectables-links-module-AuthModule-2e8e6f048b97ed6bb5330e9e147d7478"'
                                        : 'data-target="#xs-injectables-links-module-AuthModule-2e8e6f048b97ed6bb5330e9e147d7478"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-AuthModule-2e8e6f048b97ed6bb5330e9e147d7478"'
                                        : 'id="xs-injectables-links-module-AuthModule-2e8e6f048b97ed6bb5330e9e147d7478"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BookModule.html" data-type="entity-link">BookModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#controllers-links-module-BookModule-74d9304dcd1c3f16e18c195716b43600"'
                                            : 'data-target="#xs-controllers-links-module-BookModule-74d9304dcd1c3f16e18c195716b43600"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-BookModule-74d9304dcd1c3f16e18c195716b43600"'
                                            : 'id="xs-controllers-links-module-BookModule-74d9304dcd1c3f16e18c195716b43600"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/BookController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#injectables-links-module-BookModule-74d9304dcd1c3f16e18c195716b43600"'
                                        : 'data-target="#xs-injectables-links-module-BookModule-74d9304dcd1c3f16e18c195716b43600"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-BookModule-74d9304dcd1c3f16e18c195716b43600"'
                                        : 'id="xs-injectables-links-module-BookModule-74d9304dcd1c3f16e18c195716b43600"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/BookService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BookService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RecordService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RecordService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoryModule.html" data-type="entity-link">CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#controllers-links-module-CategoryModule-0e8fe13ef29caa10a9e9df92a546f305"'
                                            : 'data-target="#xs-controllers-links-module-CategoryModule-0e8fe13ef29caa10a9e9df92a546f305"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-CategoryModule-0e8fe13ef29caa10a9e9df92a546f305"'
                                            : 'id="xs-controllers-links-module-CategoryModule-0e8fe13ef29caa10a9e9df92a546f305"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#injectables-links-module-CategoryModule-0e8fe13ef29caa10a9e9df92a546f305"'
                                        : 'data-target="#xs-injectables-links-module-CategoryModule-0e8fe13ef29caa10a9e9df92a546f305"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-CategoryModule-0e8fe13ef29caa10a9e9df92a546f305"'
                                        : 'id="xs-injectables-links-module-CategoryModule-0e8fe13ef29caa10a9e9df92a546f305"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/BookService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BookService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RecordService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RecordService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link">DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RecordModule.html" data-type="entity-link">RecordModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#controllers-links-module-RecordModule-5eea7d9fe81b9f0e620f28721bd89e64"'
                                            : 'data-target="#xs-controllers-links-module-RecordModule-5eea7d9fe81b9f0e620f28721bd89e64"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-RecordModule-5eea7d9fe81b9f0e620f28721bd89e64"'
                                            : 'id="xs-controllers-links-module-RecordModule-5eea7d9fe81b9f0e620f28721bd89e64"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/RecordController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecordController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#injectables-links-module-RecordModule-5eea7d9fe81b9f0e620f28721bd89e64"'
                                        : 'data-target="#xs-injectables-links-module-RecordModule-5eea7d9fe81b9f0e620f28721bd89e64"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-RecordModule-5eea7d9fe81b9f0e620f28721bd89e64"'
                                        : 'id="xs-injectables-links-module-RecordModule-5eea7d9fe81b9f0e620f28721bd89e64"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/RecordService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RecordService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#controllers-links-module-UserModule-d11860a41ac19b0d35c4956e7d36624f"'
                                            : 'data-target="#xs-controllers-links-module-UserModule-d11860a41ac19b0d35c4956e7d36624f"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-UserModule-d11860a41ac19b0d35c4956e7d36624f"'
                                            : 'id="xs-controllers-links-module-UserModule-d11860a41ac19b0d35c4956e7d36624f"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#injectables-links-module-UserModule-d11860a41ac19b0d35c4956e7d36624f"'
                                        : 'data-target="#xs-injectables-links-module-UserModule-d11860a41ac19b0d35c4956e7d36624f"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-UserModule-d11860a41ac19b0d35c4956e7d36624f"'
                                        : 'id="xs-injectables-links-module-UserModule-d11860a41ac19b0d35c4956e7d36624f"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${
                              isNormalMode
                                ? 'data-target="#controllers-links"'
                                : 'data-target="#xs-controllers-links"'
                            }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${
                              isNormalMode
                                ? 'id="controllers-links"'
                                : 'id="xs-controllers-links"'
                            }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link">AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link">AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BookController.html" data-type="entity-link">BookController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoryController.html" data-type="entity-link">CategoryController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RecordController.html" data-type="entity-link">RecordController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link">UserController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#classes-links"'
                            : 'data-target="#xs-classes-links"'
                        }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? 'id="classes-links"'
                            : 'id="xs-classes-links"'
                        }>
                            <li class="link">
                                <a href="classes/Book.html" data-type="entity-link">Book</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookPaginationParam.html" data-type="entity-link">BookPaginationParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link">Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryPaginationParam.html" data-type="entity-link">CategoryPaginationParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBookDto.html" data-type="entity-link">CreateBookDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link">CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRecordDto.html" data-type="entity-link">CreateRecordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link">CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExceptionsFilter.html" data-type="entity-link">ExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/GoogleUserDto.html" data-type="entity-link">GoogleUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdParam.html" data-type="entity-link">IdParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/LengthLimits.html" data-type="entity-link">LengthLimits</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationParam.html" data-type="entity-link">PaginationParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/Record.html" data-type="entity-link">Record</a>
                            </li>
                            <li class="link">
                                <a href="classes/RecordPaginationParam.html" data-type="entity-link">RecordPaginationParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignedInUserDto.html" data-type="entity-link">SignedInUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBookDto.html" data-type="entity-link">UpdateBookDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link">UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRecordDto.html" data-type="entity-link">UpdateRecordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link">UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserPaginationParam.html" data-type="entity-link">UserPaginationParam</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${
                              isNormalMode
                                ? 'data-target="#injectables-links"'
                                : 'data-target="#xs-injectables-links"'
                            }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${
                              isNormalMode
                                ? 'id="injectables-links"'
                                : 'id="xs-injectables-links"'
                            }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookService.html" data-type="entity-link">BookService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link">CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExcludeNullInterceptor.html" data-type="entity-link">ExcludeNullInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthGuard.html" data-type="entity-link">GoogleAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleStrategy.html" data-type="entity-link">GoogleStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link">JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link">JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link">LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link">LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecordService.html" data-type="entity-link">RecordService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#guards-links"'
                            : 'data-target="#xs-guards-links"'
                        }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? 'id="guards-links"'
                            : 'id="xs-guards-links"'
                        }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link">RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#interfaces-links"'
                            : 'data-target="#xs-interfaces-links"'
                        }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? ' id="interfaces-links"'
                            : 'id="xs-interfaces-links"'
                        }>
                            <li class="link">
                                <a href="interfaces/IRequest.html" data-type="entity-link">IRequest</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"'
                        }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? 'id="miscellaneous-links"'
                            : 'id="xs-miscellaneous-links"'
                        }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
      this.innerHTML = tp.strings;
    }
  },
);
