canonical_base = Jekyll.configuration({})['canonical_base']

Jekyll::Hooks.register :pages, :pre_render do |page|
  base = page.site.config['canonical_base'] || page.site.config['url']
  canonical_url = File.join(base, page.url.to_s)
  canonical_url = canonical_url.sub(/index\.html$/, '/')
  page.data['canonical_url'] = canonical_url
end

Jekyll::Hooks.register :documents, :pre_render do |doc|
  base = doc.site.config['canonical_base'] || doc.site.config['url']
  canonical_url = File.join(base, doc.url.to_s)
  canonical_url = canonical_url.sub(/index\.html$/, '/')
  doc.data['canonical_url'] = canonical_url
end

require 'addressable/uri'

module Jekyll
  class SeoTag
    class Drop
      alias_method :original_canonical_url, :canonical_url
      def canonical_url
        base = site['canonical_base'] || site['url']
        if page['canonical_url'].to_s.empty?
          Addressable::URI.join(base, page['url']).to_s.gsub(%r!/index\.html$!, '/')
        else
          page['canonical_url']
        end
      end
    end
  end
end
