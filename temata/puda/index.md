---
layout: default
title: Půda a voda
description: kvalita půdy a přirozené vodní hospodářství v krajině
keywords: kvalita půdy, vsakování vody, odpařování vody, zachytávání vody, zavlažování, intenzivní zemědělství, životní prostředí
---


<div class="row">
  <div class="columns">
    <div class="o-section">
      <div class="o-section-inner">
          <header class="c-page-header">
            <h1 itemprop="headline" class="c-page-title">Půda a voda</h1>
          </header>
          {% assign tag = 'půda-a-voda'  %}
          <ul>
          {% for post in site.tags[tag] %}
            <li><a href="{{ post.url }}">{{ post.title }}</a></li>{% endfor %}
          </ul><hr><hr>
         {% assign posts=site.tags[tag] %} 
         {% include articles/list-responsive.html posts=posts %}
         {% include articles/pagination.html paginator=paginator %}
      </div>
    </div>
  </div>
</div>
