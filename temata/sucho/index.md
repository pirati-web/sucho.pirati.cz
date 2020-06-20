---
layout: default
title: Sucho a klimatická změna
description:  Sucho a klimatická změna - expertní tým České pirátské strany
keywords: Sucho, klimatická změna, piráti
---


<div class="row">
  <div class="columns">
    <div class="o-section">
      <div class="o-section-inner">
          <header class="c-page-header">
            <h1 itemprop="headline" class="c-page-title">Sucho a klimatická změna</h1>
          </header>
          {% assign tag = 'sucho'  %}
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
